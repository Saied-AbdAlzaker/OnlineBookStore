import { Box, Button, Typography } from "@mui/material";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import newBook from "../../../../assets/Image/newBook.png";
import newLetter from "../../../../assets/Image/newLetter.png";
import { MdOutlineEmail } from "react-icons/md";

export default function Newsletter() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FCEBEA",
          p: 5,
          borderRadius: "30px",
          margin: "30px 0px",
        }}
      >
        <Swiper
          autoHeight={true}
          spaceBetween={20}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="featureContent">
              <Box
                sx={{
                  margin: "auto",
                  width: "60%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#393280",
                    marginBottom: "10%",
                    fontWeight: "700",
                  }}
                >
                  All books are 50% off now! Don't miss such a deal!
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#393280" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  eu feugiat amet, libero ipsum enim pharetra hac.
                </Typography>
                <div className="d-flex mt-3">
                  <div className="featureTime">
                    <Typography
                      variant="h5"
                      sx={{ color: "#EF6B4A", fontWeight: "600" }}
                    >
                      768
                    </Typography>
                    <Typography variant="subtitle1">Days</Typography>
                  </div>
                  <div className="featureTime mx-5">
                    <Typography
                      variant="h5"
                      sx={{ color: "#EF6B4A", fontWeight: "600" }}
                    >
                      01
                    </Typography>
                    <Typography variant="subtitle1">Hour</Typography>
                  </div>
                  <div className="featureTime">
                    <Typography
                      variant="h5"
                      sx={{ color: "#EF6B4A", fontWeight: "600" }}
                    >
                      27
                    </Typography>
                    <Typography variant="subtitle1">Mint</Typography>
                  </div>
                  <div className="featureTime mx-5">
                    <Typography
                      variant="h5"
                      sx={{ color: "#EF6B4A", fontWeight: "600" }}
                    >
                      55
                    </Typography>
                    <Typography variant="subtitle1">Sec</Typography>
                  </div>
                </div>
              </Box>
              <Box>
                <img src={newBook} alt="newBook" />
              </Box>
            </div>
          </SwiperSlide>
        </Swiper>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FCEBEA",
          pb: 15,
          pl: 5,
          pr: 5,
          pt: 0,
          marginBottom: "30px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ED553B",
            color: "#fff",
            pt: 5,
            pb: 15,
          }}
        >
          <Typography variant="h3">Subscibe to Our Newsletter</Typography>
          <Typography variant="subtitle2">
            Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,{" "}
            <br />
            consectetur. Elit adipiscing enim pharetra hac.
          </Typography>
        </Box>

        <div className="d-flex justify-content-center align-items-center mb-3 shadow p-3 newsLetter bg-white">
          <Box sx={{ display: "flex" }}>
            <MdOutlineEmail size={30} />
            <Typography sx={{ color: "#57656C", marginLeft: "5px" }}>
              youremail123@gmail.com
            </Typography>
          </Box>
          <Button
            sx={{
              backgroundColor: "#ED553B",
              color: "#fff",
              marginLeft: "5px",
            }}
          >
            SUBSCRIBE
          </Button>
        </div>
        <img
          src={newLetter}
          alt="newLetter"
          className="position-absolute bottom-3 end-0"
        />
        <img
          src={newLetter}
          alt="newLetter"
          className="position-absolute top-0 start-0"
        />
      </Box>
    </>
  );
}
