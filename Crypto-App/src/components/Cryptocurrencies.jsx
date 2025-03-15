import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

import { useState, useEffect } from 'react'
import Loader from './Loader'
const Cryptocurrencies = ({ simplified }) => {


    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

    const [cryptos, setCryptos] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {


        const filterData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setCryptos(filterData);
    }, [cryptosList, searchTerm]);

    console.log(cryptos);

    if (isFetching) return <Loader />;

    return (
        <>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
                </div>
            )}


            <Row gutter={[32, 16]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                        <Card title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} height="20" />}
                            hoverable
                        >

                            <p>Price : {millify(currency.price)} </p>
                            <p>Market Cap : {millify(currency.marketCap)} </p>
                            <p>Daily change : {millify(currency.change)}% </p>
                        </Card>
                        </Link>
                    </Col>

                ))}

            </Row>
        </>
    )
}

export default Cryptocurrencies
