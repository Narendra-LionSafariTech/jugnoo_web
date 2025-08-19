import { logout } from "../Redux/slice/authSlice";
import store from "../redux/store/store";

export const handleLogout = () => {
  store.dispatch(logout());
  window.location.href = "/login";
};
