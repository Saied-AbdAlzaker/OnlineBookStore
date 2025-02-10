import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../../Models/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH } from "../../../../Constants/END_POINTS";
import {
  emailValidation,
  otpValidation,
  passwordValidation,
} from "../../../../Constants/VALIDATIONS";
import PulseLoader from "react-spinners/esm/PulseLoader";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function ResetPassword() {
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
      let response = await axios.post(AUTH.resetPassword, data);
      setLoading(false);
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  // Password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid sx={{ width: "100%" }}>
        <Typography component="p" variant="subtitle1" sx={{ color: "#6B6B68" }}>
          Welcome back!
        </Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Reset Your Password Now !
        </Typography>
      </Grid>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ width: "100%" }}
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

        {/* Otp */}
        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel htmlFor="standard-adornment-password">Otp</InputLabel>
          <Input
            id="standard-adornment-password"
            type="otp"
            {...register("otp", otpValidation)}
            error={!!errors.otp}
          />
          <Typography variant="body2" sx={{ mt: 1, color: "#EF6B4A" }}>
            {errors?.otp?.message}
          </Typography>
        </FormControl>

        {/* Password */}
        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            fullWidth
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            {...register("password", passwordValidation)}
            error={!!errors.password}
          />
          <Typography variant="body2" sx={{ mt: 1, color: "#EF6B4A" }}>
            {errors?.password?.message}
          </Typography>
        </FormControl>

        {/* Button */}
        {loading ? (
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              fontSize: "18px",
              py: 2,
              mt: 2,
              color: "#EF6B4A",
              "&:hover": {
                borderColor: "#EF6B4A",
                backgroundColor: "rgba(98,81,221,0.08)",
              },
            }}
          >
            <PulseLoader color="#EF6B4A" />
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              fontSize: "18px",
              mt: 5,
              backgroundColor: "#EF6B4A",
              "&:hover": {
                backgroundColor: "#Ee6B4c",
              },
            }}
          >
            Send
          </Button>
        )}
        {/* Login */}
        <Button
          onClick={() => navigate("/login")}
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            fontSize: "18px",
            py: 1,
            mt: 1,
            color: "#6251DD",
            // backgroundColor: "#6251DD",
            "&:hover": {
              borderColor: "#6251DD",
              backgroundColor: "rgba(98,81,221,0.08)",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
