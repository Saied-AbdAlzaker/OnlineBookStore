import { Box, Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import logoImg from "../../../../assets/Image/Logo.png";

export default function AuthLayout() {
  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid md={6} sm={4} xs={false}>
            <Stack>
              <Stack className="imgContainer"></Stack>
            </Stack>
          </Grid>
          <Grid md={6} sm={8} xs={12} sx={{ pr: 10, pl: 10 }}>
            <Stack>
              <Stack sx={{ width: "15%", margin: "2rem auto" }}>
                <img src={logoImg} alt="Book Store" />
              </Stack>
            </Stack>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
