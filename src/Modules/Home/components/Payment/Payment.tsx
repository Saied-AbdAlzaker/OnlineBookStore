import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartContext from "../../../Context/CartContext";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  // Data Basket From CartContext
  const cartContext = useContext(CartContext);
  // Validation in cartContext is not null
  if (!cartContext) {
    return <Typography>Error: Cart context is not available. </Typography>;
  }

  //   const { cartId, getMyBasket } = cartContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements?.getElement(CardElement);
    const addressElement = elements?.getElement(AddressElement);

    if (!cardElement || !addressElement) {
      return;
    }

    const address = await addressElement.getValue();
    const { error, token } = await stripe?.createToken(cardElement);
    console.log("Token", { token });
    console.log("Address", address);

    if (error) {
      toast.error(error.message);
    } else {
      if (address.complete) {
        const id = cartId;
        const data = {
          token: token.id,
        };
        try {
          const response = await api.post(`${createOrder}/${id}`, data);
          console.log(response);
          const orderId = response.data.data.id;
          const totalAmount = response.data.data.total;
          toast.success(response.data.message);
          navigate("/dashboard/confirmation", {
            state: { orderId, totalAmount },
          });
          // getMyBasket();
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("complete missing fields");
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFE5E5",
          padding: 2,
          display: "flex",
          justifyContent: "center",
          color: "#393280",
          width: "100%",
        }}
      >
        <Link className="nav-link" aria-current="page" to={"/dashboard"}>
          Home /
        </Link>
        <Link
          className="nav-link mx-2"
          aria-current="page"
          to={"/dashboard/allProduct"}
        >
          Cart
        </Link>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2
              sx={{
                padding: 3,
                marginTop: 6,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                ml: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#333",
                  mb: 2,
                }}
              >
                Payment Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <CardElement />
            </Grid2>
            <Divider sx={{ mb: 2 }} />
            <Grid2
              sx={{
                padding: 3,
                marginTop: 3,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                ml: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#333",
                  mb: 2,
                }}
              >
                Shipping Data
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <AddressElement
                options={{
                  mode: "shipping",
                  fields: {
                    phone: "always",
                  },
                }}
              />
              <Divider sx={{ mb: 2 }} />
            </Grid2>
          </Grid2>
        </form>
        <Button
          onClick={() => navigate("/confirmation")}
          variant="outlined"
          fullWidth
          sx={{ color: "#fa8072", mt: 2, py: 1.5 }}
        >
          Continue Shopping
        </Button>
      </Box>
    </>
  );
}
