import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import Loading from "./Loading";

const { Title } = Typography;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName, isFetchingHistory }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i--) {
        coinPrice.push(coinHistory?.data?.history[i].price);
        coinTimestamp.push(
            new Date(
                coinHistory?.data?.history[i].timestamp * 1000
            ).toLocaleDateString()
        );
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd",
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

    if(isFetchingHistory) return <Loading />;

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
