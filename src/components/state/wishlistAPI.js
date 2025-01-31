import axios from "axios";
import {
  setWishlistError,
  setWishlistLoading,
  setWishlistSuccess,
} from "./wishlist";

export const FetchWishlistItems = async (dispatch, user) => {
  dispatch(setWishlistLoading(true));
  try {
    const config = {
      method: "get",
      url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/wishlist`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.data.wishlistItems) {
      dispatch(setWishlistSuccess(response.data.wishlistItems));
    } else {
      dispatch(setWishlistSuccess([]));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    dispatch(setWishlistError(errorMessage));
  }
};
