import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../../Models/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH } from "../../../../Constants/END_POINTS";
import { emailValidation } from "../../../../Constants/VALIDATIONS";
import PulseLoader from "react-spinners/esm/PulseLoader";
import { useState } from "react";

export default function ForgetPassword() {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>();

  let onSubmit = async (data: loginForm) => {
    try {
      setLoading(true);
      let response = await axios.post(AUTH.forgetPassword, data);
      setLoading(false);
      toast.success(response?.data?.message);
      navigate("/resetPassword");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Grid sx={{ width: "100%", mt: 5 }}>
        <Typography component="p" variant="subtitle1" sx={{ color: "#6B6B68" }}>
          Welcome back!
        </Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Forget Password !!
        </Typography>
      </Grid>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ width: "100%", mt: 5 }}
      >
        {/* Email */}
        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            id="standard-adornment-password"
            type="email"
            {...register("email", emailValidation)}
            error={!!errors.email}
          />
          <Typography variant="body2" sx={{ mt: 1, color: "#EF6B4A" }}>
            {errors?.email?.message}
          </Typography>
        </FormControl>
        {/* navigate to login */}
        <Grid item onClick={() => navigate("/login")}>
          <Typography
            variant="body2"
            textAlign="end"
            sx={{ cursor: "pointer", color: "#757575" }}
          >
            Login ?
          </Typography>
        </Grid>

        {/* Button */}
        {loading ? (
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              fontSize: "18px",
              py:2,
              mt: 5,
              color: "#6251DD",
              "&:hover": {
                borderColor: "#6251DD",
                backgroundColor: "rgba(98,81,221,0.08)",
              },
            }}
          >
            <PulseLoader color="#6251DD" />
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              fontSize: "18px",
              mt: 5,
              color: "#6251DD",
              // backgroundColor: "#6251DD",
              "&:hover": {
                borderColor: "#6251DD",
                backgroundColor: "rgba(98,81,221,0.08)",
              },
            }}
          >
            Send
          </Button>
        )}
      </Box>
    </>
  );
}
