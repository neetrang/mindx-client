import { useSelector } from "react-redux";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  
  if (user) {
    return true;   // người dùng đã xác thực
  } else {
    return false;
  }
}