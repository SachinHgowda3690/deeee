import React, { useState } from 'react';
import { Typography, Row, Col, Card, Image, Button } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptonewsApi';
import Loader from './Loader';
const { Title, Text } = Typography;

const News = ({ simplified }) => {
  //const [keyword, setKeyword] = useState('cryptocurrency');
  const { data: newsData, isLoading, error } = useGetCryptoNewsQuery({
    // keyword,
    page: 0,
    size: 12, // Always fetch all available news
  });

  console.log(newsData);

  const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially only on homepage

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching crypto news. Please try again later.</div>;
  if (!newsData || newsData.length === 0) return <div>No crypto news available at the moment.</div>;

  return (
    <>
      <Row gutter={[16, 16]}>
        {newsData.slice(0, simplified ? visibleCount : newsData.length).map((news, i) => {
          let source = 'Unknown Source';
          try {
            if (news.url && typeof news.url === 'string') {
              const sanitizedUrl = news.url.replace(/…/g, '%E2%80%A6');
              const urlObj = new URL(sanitizedUrl);
              source = urlObj.hostname.replace('www.', '');
            }
          } catch (err) {
            console.error(`Invalid URL for article ${i}:`, news.url);
          }

          return (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                <a href={news.url || '#'} target="_blank" rel="noreferrer">
                  {news.thumbnail && (
                    <Image
                      src={news.thumbnail}
                      alt={news.title}
                      preview={false}
                      style={{
                        height: 200,
                        objectFit: 'cover',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                  )}

                  <div className="news-content" style={{ padding: '12px' }}>
                    <Title level={4} className="news-title" ellipsis>
                      {news.title}
                    </Title>
                    <Text type="secondary" className="news-source">
                      {source}
                    </Text>
                    <Text className="news-description">
                      {news.description?.substring(0, 120)}...
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Show More Button - Only for Homepage */}
      {simplified && visibleCount < newsData.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={() => setVisibleCount(newsData.length)}>
              Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default News;
