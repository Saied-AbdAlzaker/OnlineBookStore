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
  passwordValidation,
} from "../../../../Constants/VALIDATIONS";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import PulseLoader from "react-spinners/esm/PulseLoader";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Login() {
  let { saveUserData }: any = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  let onSubmit = async (data: loginForm) => {
    try {
      setLoading(true);
      let response = await axios.post(AUTH.login, data);
      setLoading(false);
      toast.success(response?.data?.message);
      localStorage.setItem("userToken", response.data?.data?.accessToken);
      saveUserData();
      navigate("/dashboard/home");
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
          Login to your account
        </Typography>
      </Grid>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ width: "100%" }}
      >
        {/* Email */}
        <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
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

        {/* Password */}
        <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
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
        {/* Remember Me And ForgetPassword */}
        <Grid item onClick={() => navigate("/forgetPassword")} sx={{textAlign:"end"}}>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "#757575" }}
          >
            Forget Password ?
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
              py: 2,
              mt: 1,
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
              mt: 2,
              backgroundColor: "#EF6B4A",
              "&:hover": {
                backgroundColor: "#Ee6B4c",
              },
            }}
          >
            Login
          </Button>
        )}

        {/* Register */}
        <Button
          onClick={() => navigate("/register")}
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            fontSize: "18px",
            mt: 2,
            color: "#6251DD",
            "&:hover": {
              borderColor: "#6251DD",
              backgroundColor: "rgba(98,81,221,0.08)",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </>
  );
}
