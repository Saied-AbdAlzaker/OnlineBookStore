import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerForm } from "../../Models/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH } from "../../../../Constants/END_POINTS";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  roleValidation,
} from "../../../../Constants/VALIDATIONS";
import { useState } from "react";
import PulseLoader from "./../../../../../node_modules/react-spinners/esm/PulseLoader";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Register() {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerForm>();

  let onSubmit = async (data: registerForm) => {
    try {
      setLoading(true);
      let response = await axios.post(AUTH.register, data);
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
      <Grid>
        <Typography
          component="p"
          variant="subtitle1"
          sx={{ color: "#6B6B68" }}
        >
          Create new acccount
        </Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Register
        </Typography>
      </Grid>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ width: "100%" }}
      >
        <Box sx={{ display: "flex" }}>
          {/* First Name */}
          <FormControl sx={{ width: "45%" }} variant="filled">
            <InputLabel htmlFor="standard-adornment-first_name">
              First Name
            </InputLabel>
            <Input
              id="standard-adornment-first_name"
              type="text"
              {...register("first_name", firstNameValidation)}
              error={!!errors.first_name}
            />
            <Typography variant="body2" sx={{ mt: 1, color: "#EF6B4A" }}>
              {errors?.first_name?.message}
            </Typography>
          </FormControl>

          {/* Last Name */}
          <FormControl sx={{ width: "45%",ml:5 }} variant="filled">
            <InputLabel htmlFor="standard-adornment-last_name">
              Last Name
            </InputLabel>
            <Input
              id="standard-adornment-last_name"
              type="text"
              {...register("last_name", lastNameValidation)}
              error={!!errors.last_name}
            />
            <Typography variant="body2" sx={{ mt: 1, color: "#EF6B4A" }}>
              {errors?.last_name?.message}
            </Typography>
          </FormControl>
        </Box>

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

        {/* Password */}
        <FormControl sx={{ width: "100%",mb:1 }} variant="filled">
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
          <Typography variant="body2" sx={{ color: "#EF6B4A" }}>
            {errors?.password?.message}
          </Typography>
        </FormControl>

        {/* Role */}
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            {...register("role", roleValidation)}
            error={!!errors.role}
          >
            <MenuItem value={"Customer"}>Customer</MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
          </Select>
          {errors.role && (
            <span className="text-danger">{errors.role.message}</span>
          )}
        </FormControl>

         {/* navigate to login */}
         <Grid item onClick={() => navigate("/login")} sx={{mt:1}}>
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
              py: 2,
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
            Register
          </Button>
        )}
      </Box>
    </>
  );
}
