import decode from "jwt-decode";

const checkAuth = () => {
  const token = localStorage.getItem("coupon_access_token");

  if (!token) return false;

  try {
    console.log(decode(token));
    const { exp, role } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
    if (role !== "admin") {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
export default checkAuth;
