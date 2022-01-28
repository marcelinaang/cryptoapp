import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loading from "./Loading";

const { Text, Title } = Typography;
const { Option } = Select;

const demoUrl =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12,
    });
    const { data } = useGetCryptosQuery(100);

    if (isFetching) return <Loading />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Cryptocurency">Cryptocurency</Option>
                        {data?.data?.coins.map((coin) => (
                            <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col
                    xs={24}
                    sm={12}
                    xl={8}
                    xxl={6}
                    className="news-card"
                    key={i}
                >
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.name}
                                </Title>
                                <img
                                    alt="news"
                                    src={
                                        news?.image?.thumbnail?.contentUrl ||
                                        demoUrl
                                    }
                                    style={{
                                        maxHeight: "100px",
                                        maxWidth: "100px",
                                    }}
                                />
                            </div>
                            <p>
                                {news.description > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar
                                        src={
                                            news.provider[0]?.image?.thumbnail
                                                ?.contentUrl || demoUrl
                                        }
                                        alt=""
                                    />
                                    <Text className="provider-name">
                                        {news.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text>
                                    {moment(news.dataPublished)
                                        .startOf("ss")
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
