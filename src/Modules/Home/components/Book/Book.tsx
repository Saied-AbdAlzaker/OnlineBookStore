/// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../../../../node_modules/swiper/swiper-bundle.css";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

import img1 from "../../../../assets/Image/Books/book.png";
import book1 from "../../../../assets/Image/Books/book1.png";
import book2 from "../../../../assets/Image/Books/book2.png";
import book3 from "../../../../assets/Image/Books/book3.png";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DASHBOARD } from "../../../../Constants/END_POINTS";
import { HomeDetails } from "../../Models/Dashboard";

export default function Book() {

  const BooksImg = [
    { src: img1, alt: "img1" },
    { src: book1, alt: "book1" },
    { src: book2, alt: "book2" },
    { src: book3, alt: "book3" },
  ];

  let [products, setProducts] = useState<HomeDetails[]>([]);

  async function getAllProducts() {
    try {
      const response = await axios.get(DASHBOARD.books);
      setProducts(response.data.data)
    } catch (error) {
      toast.error('Error!');
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <>
      <Box sx={{ backgroundColor: "#FCECEC", marginBottom: "20px" }}>
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
          {products?.slice(0, 4).map((book, index) => {
            return (
              <SwiperSlide>
                <div className="bookContent">
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 500,
                      marginTop: "30px",
                      padding: 2,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ color: "#393280", margin: "5% 0px" }}
                    >
                      {/* ipsum dolor si */}
                      {book?.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#7A7A7A" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna
                      commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                      eu.
                    </Typography>

                    <Button
                      // onClick={navigateToAllCategories}
                      variant="outlined"
                      sx={{
                        borderColor: "#393280",
                        color: "#393280",
                        mt: 5,
                        mb: 10,
                      }}
                    >
                      Read more <FaLongArrowAltRight className="ms-2" />
                    </Button>
                  </Box>
                  <Box>
                    {book?.image ? (
                      <CardMedia
                        component="img"
                        height="500"
                        image={BooksImg[index].src}
                        alt={BooksImg[index].alt}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        height="500"
                        image={BooksImg[index].src}
                        alt={BooksImg[index].alt}
                      />
                    )}
                  </Box>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </>
  );
}
