import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import DashboardHOC from './DashboardHoc';
import { Typography, Image, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {fetchSingleCoupons} from '../../store/coupon/coupoonActionCreators'

const { Title, Text } = Typography;
const SingleCoupon = ({ match }) => {
  const dispatch = useDispatch();
  const {singleCoupon} = useSelector(state => state.coupon);
  const code = match.params.code;
  const [qrcode, setQrCode] = useState();
  const generateQR = async (text) => {
    try {
      setQrCode(await QRCode.toDataURL(text));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchSingleCoupons(code);
  }, [code]);
  useEffect(() => {
    generateQR(code);
  }, [code]);
  return (
    <>
      <Button className="float-right">Edit Coupon</Button>
      <div className="clear-both">
        <Title level={5}>Coupon Code</Title>
        <Text>CODE123</Text>
        <Title level={5}>Description</Title>
        <Text>Coupon for 50% off</Text>
        <Title level={5}>Available</Title>
        <Text>Yes</Text>
        <Title level={5}>Redeemable from</Title>
        <Text>15/12/2020</Text>
        <Title level={5}>Redeemable To</Title>
        <Text>15/12/2020</Text>
        <Title level={5}>QR Code</Title>
        <Image width={200} src={qrcode} />
      </div>
    </>
  );
};

export default DashboardHOC(SingleCoupon, '2');
