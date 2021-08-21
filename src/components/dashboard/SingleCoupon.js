import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import DashboardHOC from './DashboardHoc';
import { Typography, Image, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleCoupons } from '../../store/coupon/couponActionCreators';

const { Title, Text } = Typography;
const SingleCoupon = ({ match }) => {
  const dispatch = useDispatch();
  const { singleCoupon, loading } = useSelector((state) => state.coupon);
  const id = match.params.id;
  const [qrcode, setQrCode] = useState();
  const generateQR = async (text) => {
    try {
      setQrCode(await QRCode.toDataURL(text));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    dispatch(fetchSingleCoupons(id));
  }, [dispatch, id]);
  useEffect(() => {
    if(singleCoupon && singleCoupon.code) { 
      generateQR(singleCoupon.code);
    }
  }, [singleCoupon]);
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      {singleCoupon && (
        <>
          <Button className="float-right">Edit Coupon</Button>
          <div className="clear-both">
            <Title level={5}>Coupon Code</Title>
            <Text>{singleCoupon.code}</Text>
            <Title level={5}>Percentage off</Title>
            <Text>{singleCoupon.percent_off}%</Text>
            <Title level={5}>Description</Title>
            <Text>{singleCoupon.description}</Text>
            <Title level={5}>Available</Title>
            <Text>{singleCoupon.description}</Text>
            <Title level={5}>Redeemable from</Title>
            <Text>{singleCoupon.redeem_from}</Text>
            <Title level={5}>Redeemable To</Title>
            <Text>{singleCoupon.redeem_to}</Text>
            <Title level={5}>QR Code</Title>
            <Image width={200} src={qrcode} />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardHOC(SingleCoupon, '2');
