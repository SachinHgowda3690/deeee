import React from 'react'
import millify from 'millify';
import { Typography,Row,Col,Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const HomePage = () => {

const { Title } = Typography;

const{data,isFetching}=useGetCryptosQuery(10);

console.log(data);

const globalStats = data?.data?.stats;

  if(isFetching){
    return <Loader />;
  }

  return (
    <>
        <Title level={2} className='heading'>
        Global Crypto Stats
        </Title>
        <Row>
            <Col span={12}>
                <Statistic title="Total cryptocurrencies" value={globalStats.total}  />
            </Col>
            <Col span={12}>
                <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}  />
            </Col>
            <Col span={12}>
                <Statistic title="Total market cap" value={millify(globalStats.totalMarketCap)}  />
            </Col>
            <Col span={12}>
                <Statistic title="Total 24h volume" value={millify(globalStats.total24hVolume)}  />
            </Col>
            <Col span={12}>
                <Statistic title="Total markets" value={millify(globalStats.totalMarkets)}  />
            </Col>
           
            
        </Row>

        <div className='home-heading-container'>
       <Title level={2} className='home-title'>
        Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className='show-more'>
        <Link to='/cryptocurrencies'>Show More</Link>
        </Title>
        </div>
        <Cryptocurrencies simplified/>

        <div className='home-heading-container'>
       <Title level={2} className='home-title'>
       Latest Crypto News
        </Title>
        {/* <Title level={3} className='show-more'>
        <Link to='/news'>Show More</Link>
        </Title> */}
        </div>
        <News simplified/>
    </>
  )
}

export default HomePage
