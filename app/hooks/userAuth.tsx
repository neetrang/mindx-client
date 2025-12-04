import { useSelector } from "react-redux";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  
  if (user) {
    return true;   // user is authenticated
  } else {
    return false;
  }
}