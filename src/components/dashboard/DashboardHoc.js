import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons } from '../../store/coupon/couponActionCreators';

function DashboardHOC(Component, index) {
  return function DashboardCustomHoc(props) {
    const [collapsed, setCollapsed] = useState(true);
    const dispatch = useDispatch();
    const { coupons } = useSelector((state) => state.coupon);
    useEffect(() => {
      if (coupons.length < 1) {
        dispatch(fetchCoupons());
      }
    }, [dispatch, coupons]);
    const handleSetCollapsed = () => {
      setCollapsed(!collapsed);
    };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar
          index={index}
          collapsed={collapsed}
          //   loggedInUserId={loggedInUser ? loggedInUser._id : null}
        />
        <Layout className="site-layout">
          <DashboardHeader
            history={props.history}
            collapsed={collapsed}
            toggle={handleSetCollapsed}
          />
          <div className="container">
            <Component {...props} />
          </div>
        </Layout>
      </Layout>
    );
  };
}

export default DashboardHOC;
