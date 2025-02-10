import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { CiShoppingCart } from "react-icons/ci";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AUTH } from "../../../../Constants/END_POINTS";
import { toast } from "react-toastify";
import logoImg from "../../../../assets/Image/Logo.png";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { MdLogout, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { passwordValidation } from "../../../../Constants/VALIDATIONS";
import { loginForm } from "../../../Auth/Models/Auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PulseLoader from "react-spinners/esm/PulseLoader";

export default function Navbar() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  // Logout
  const [openLogout, setOpenLogout] = useState(false);

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleLogout = async () => {
    handleCloseLogout();
    localStorage.clear();
    navigate("/login");
  };

  // Cahnge Password
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("userToken");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>();

  let onSubmit = async (data: loginForm) => {
    handleClose();
    try {
      setLoading(true);
      let response = await axios.post(AUTH.changePassword, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("userToken", response.data?.data?.accessToken);
      setLoading(false);
      toast.success(response?.data?.message);
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
  // New Password
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);
  const handleMouseDownPasswordNew = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPasswordNew = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


  return (
    <>
      <div className="d-flex justify-content-between align-items-center bgNavbar p-2 text-white">
        <div className="ms-3">
          <h1 className="h6">Online Book Store</h1>
        </div>
        <div className="me-3">
          <FaFacebook className="cursor" />
          <FaInstagram className="mx-3 cursor" />
          <FaLinkedin className="cursor" />
          <FaTwitter className="mx-3 cursor" />
          <FaYoutube className="cursor" />
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-white px-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={""}>
                  Home |
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={""}>
                  ABOUT US |
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/dashboard/allProduct"}>
                  BOOKS |
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={""}>
                  NEW RELEASE |
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={""}>
                  CONTACT US |
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={""}>
                  BLOG
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navContent">
              <li className="nav-item">
                <Link className="nav-link" to={""}>
                  <CiShoppingCart size={30} />
                </Link>
              </li>
              <li className="nav-item">
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <>
                      <Button {...bindTrigger(popupState)} className="navBtn">
                        <Avatar className="cursor">H</Avatar>
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close} className="p-0">
                          <Button className="mx-auto">
                            <CgProfile size={20} className="me-2" />
                            Profile
                          </Button>
                        </MenuItem>
                        <MenuItem onClick={popupState.close} className="p-0">
                          <Button className="mx-auto" onClick={handleClickOpen}>
                            <RiLockPasswordLine size={20} className="me-2" />
                            Change Password
                          </Button>
                        </MenuItem>
                        <MenuItem onClick={popupState.close} className="p-0">
                          <Button
                            onClick={handleClickOpenLogout}
                            className="mx-auto"
                          >
                            <MdLogout size={20} className="me-2" /> Logout
                          </Button>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </PopupState>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Logout Dialog */}
      <Dialog
        open={openLogout}
        onClose={handleCloseLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="rounded-5"
      >
        <DialogContent>
          <div className="text-center">
            <img src={logoImg} alt="Book Store" className="logo" />
            <DialogTitle id="alert-dialog-title">
              {"Logout From Online Book Store ?"}
            </DialogTitle>
          </div>
          <DialogContentText id="alert-dialog-description">
            are you sure you want to Exit ? if you are sure just click on Logout
            it.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center align-items-center">
          <Button
            variant="outlined"
            sx={{
              fontSize: "18px",
              py: 1,
              color: "#6251DD",
              // backgroundColor: "#6251DD",
              "&:hover": {
                borderColor: "#6251DD",
                backgroundColor: "rgba(98,81,221,0.08)",
              },
            }}
            onClick={handleCloseLogout}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontSize: "18px",
              py: 1,
              backgroundColor: "#EF6B4A",
              "&:hover": {
                backgroundColor: "#Ee6B4c",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      {/* Change Password Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="rounded-5"
      >
        <DialogContent>
          <div className="text-center">
            <img src={logoImg} alt="Book Store" className="logo" />
            <DialogTitle id="alert-dialog-title">
              <Typography
                component="p"
                variant="subtitle1"
                sx={{ mt: 2, color: "#6B6B68" }}
              >
                Welcome back!
              </Typography>
              {"Change Your Password Easily"}
            </DialogTitle>
          </div>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            sx={{ mt: 2, width: "100%" }}
          >
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
                        showPassword
                          ? "hide the password"
                          : "display the password"
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

            {/* New Password */}
            <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showPasswordNew ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPasswordNew
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPasswordNew}
                      onMouseDown={handleMouseDownPasswordNew}
                      onMouseUp={handleMouseUpPasswordNew}
                    >
                      {showPasswordNew ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("password_new", passwordValidation)}
                error={!!errors.password_new}
              />
              <Typography variant="body2" sx={{ mt: 1, color: "#EF6B4A" }}>
                {errors?.password_new?.message}
              </Typography>
            </FormControl>

            <DialogActions className="d-flex justify-content-center align-items-center">
              {/* Close */}
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  fontSize: "18px",
                  py: 1,
                  color: "#6251DD",
                  // backgroundColor: "#6251DD",
                  "&:hover": {
                    borderColor: "#6251DD",
                    backgroundColor: "rgba(98,81,221,0.08)",
                  },
                }}
                onClick={handleClose}
              >
                Close
              </Button>
              {/* Save */}
              {loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{
                    fontSize: "18px",
                    py: 2,
                    mt: 1,
                    mb: 2,
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
                    py: 1,

                    backgroundColor: "#EF6B4A",
                    "&:hover": {
                      backgroundColor: "#Ee6B4c",
                    },
                  }}
                >
                  Save
                </Button>
              )}
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
