import axios from "axios";
import { setCartError, setCartLoading, setCartSuccess } from "./cart";

export const FetchCartItems = async (dispatch, user) => {
    dispatch(setCartLoading(true));
    try {
      const config = {
        method: "get",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(config);

      if (response.data.cartItems) {
        dispatch(setCartSuccess(response.data.cartItems));
        // setCartCount(response.data?.cartItems?.length);
      } else {
        dispatch(setCartSuccess([]));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      setCartError(errorMessage);
    }
  };