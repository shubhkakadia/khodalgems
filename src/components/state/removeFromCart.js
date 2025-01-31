import axios from "axios";
import { toast } from "react-toastify";
import { FetchCartItems } from "./cartAPI";

export async function removeFromCart(dispatch, user, productIds) {
  const toastId = toast.loading("Adding to cart...", {
    position: "top-right",
  });
  try {
    const config = {
      method: "delete",
      url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/cart`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      data: { productIds: productIds },
    };

    const response = await axios.request(config);
    toast.dismiss(toastId);

    if (response.data && response.data.message) {
      FetchCartItems(dispatch, user);

      toast.success(
        `Diamond with stone no: ${productIds} removed from cart successfully`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } else {
      throw new Error("Failed to remove products from cart");
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
