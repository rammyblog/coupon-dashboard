import React from 'react';
import DashboardHOC from './DashboardHoc';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Coupon = () => {
  const { coupons } = useSelector((state) => state.coupon);
  
  const columns = [
    {
      title: 'CODE',
      dataIndex: 'code',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.code.indexOf(value) === 0,
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend'],
      render: (text, record) => (
        <Link to={`/coupon/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: 'Percent off',
      dataIndex: 'percent_off',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.percent_off - b.percent_off,
    },
    {
      title: 'From',
      dataIndex: 'redeem_from',
    },
    {
      title: 'To',
      dataIndex: 'redeem_to',
    },
  ];

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  return (
    <div>
      <Button type="link">
        <Link to="/coupon/create">Create Coupon</Link>
      </Button>
      <Table columns={columns} dataSource={coupons} />
    </div>
  );
};

export default DashboardHOC(Coupon, '2');
