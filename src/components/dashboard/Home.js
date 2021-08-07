import React, { useEffect, useState, useCallback } from 'react';
import DashboardHOC from './DashboardHoc';
import { Card, Col, Row, Typography } from 'antd';
import { Doughnut, Line } from 'react-chartjs-2';
const { Title } = Typography;

const Home = () => {

  const [lineData, setLineData] = useState();
  const [doughnutStateData, setdoughnutStateData] = useState();
  const couponsByMonth = [
    { month: 'Jan', count: 1 },
    { month: 'FEB', count: 2 },
    { month: 'Mar', count: 34 },
    { month: 'Apr', count: 5 },
  ];

  const lineStatsData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Coupon dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  const DoughnutData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const getCouponData = useCallback(() => {
    // const activeUsers = users
    //   ? users.filter((user) => user.isActive === true).length
    //   : 0;
    // const totalStaffs = users
    //   ? users.filter((user) => user.role === "staff").length
    //   : 0;

    // const inActiveUsers = users ? users.length - activeUsers : 0;
    // const userObj = [
    //   { name: "Total Users", stats: users ? users.length : 0 },
    //   { name: "Active Users", stats: activeUsers },
    //   { name: "Total Staffs", stats: totalStaffs },
    //   { name: "Total inactive users", stats: inActiveUsers },
    // ];

    const activeCoupons = 10;
    const inactiveCoupons = 10;
    DoughnutData.datasets[0].data.push(activeCoupons);
    DoughnutData.datasets[0].data.push(inactiveCoupons);
    setdoughnutStateData(DoughnutData);

    return;
    // eslint-disable-next-line
  }, []);

  const arrangeCouponStats = useCallback(() => {
    if (couponsByMonth) {
      for (let index = 0; index < couponsByMonth.length; index++) {
        const data = couponsByMonth[index];
        lineStatsData.labels.push(data.month);
        lineStatsData.datasets[0].data.push(data.count);
      }
      setLineData(lineStatsData);
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   setuserObj(getUsersData());
  // }, [users]);

  // useEffect(() => {
  //   if (coupons.length < 1) {
  //     dispatch(fetchCoupons());
  //   }
  // }, [dispatch, coupons]);

  useEffect(() => {
    getCouponData();
    arrangeCouponStats();
  }, [getCouponData, arrangeCouponStats]);

  const CardObj = [
    {
      title: 'Total Coupons',
      content: '8',
    },
    {
      title: 'Total Active Coupons',
      content: '10',
    },
    {
      title: 'Total Inactive Coupons',
      content: '8',
    },
  ];
  return (
    <div>
      <Title>Home</Title>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {CardObj.map((item, index) => (
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              xl={8}
              key={index}
              span={8}
              className="mb-4"
            >
              <Card title={item.title} bordered={true}>
                {item.content}
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="row">
        <div className="col-md-8">
          <Card title="User overtime">
            {/* <Spin spinning={loading}> */}
            <Line data={lineData} width={100} height={50} />
            {/* </Spin> */}
          </Card>
        </div>

        <div className="col-md-4 ">
          <Card title="Active Vs Inactive ">
            {doughnutStateData ? (
              <>
                {/* <Spin spinning={loading}> */}
                <Doughnut data={doughnutStateData} width={100} height={115} />
                {/* </Spin> */}
              </>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHOC(Home, '1');
