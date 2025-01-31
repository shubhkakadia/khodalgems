import axios from "axios";
import { toast } from "react-toastify";
import { FetchWishlistItems } from "./wishlistAPI";

export async function removeFromWishlist(dispatch, user, number) {
  const toastId = toast.loading("Adding to cart...", {
    position: "top-right",
  });
  try {
    const config = {
      method: "delete",
      url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/wishlist`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      data: { productIds: number },
    };

    const response = await axios.request(config);
    toast.dismiss(toastId);
    if (response.data && response.data.message) {
      FetchWishlistItems(dispatch, user);
      toast.success(
        `Diamond with stone no: ${number} removed from wishlist successfully`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } else {
      throw new Error("Failed to remove products from wishlist");
    }
  } catch (error) {
    toast.dismiss(toastId);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000,
    });
  }
}
