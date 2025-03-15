// LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // Check if data exists
  if (!coinHistory?.data?.history?.length) {
    return <div>No historical data available</div>;
  }

  const coinPrice = coinHistory.data.history.map(item => parseFloat(item.price));
  const coinTimestamp = coinHistory.data.history.map(item =>
    new Date(item.timestamp * 1000).toLocaleDateString()
  );

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      <Row className='chart-header'>
        <AntTitle level={2}>{coinName} Price Chart</AntTitle>
        <Col>
          <AntTitle level={5}>
            {coinHistory.data.change}%
          </AntTitle>
          <AntTitle level={5}>
            Current Price: ${currentPrice}
          </AntTitle>
        </Col>
      </Row>
      <div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
