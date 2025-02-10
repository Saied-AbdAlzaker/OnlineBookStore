import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import book1 from "../../../../assets/Image/book.png";
import book2 from "../../../../assets/Image/Books/book1.png";
import book3 from "../../../../assets/Image/Books/book2.png";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { DASHBOARD } from "../../../../Constants/END_POINTS";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { HomeDetails } from "../../Models/Dashboard";

export default function Feature() {

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

  const BooksImg = [
    { src: book1, alt: "book1" },
    { src: book2, alt: "book2" },
    { src: book3, alt: "book3" },
  ];

  return (
    <>
      <Box sx={{ backgroundColor: "#F7FFFE", marginTop: "30px" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper"
        >
          {products?.slice(0,3).map((book, index) => {
            return (
              <SwiperSlide>
                <div className="featureContent">
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
                      sx={{
                        color: "#393280",

                        margin: "10% 0px",
                      }}
                    >
                      Featured book
                    </Typography>
                    <span className="lineFeature"></span>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "#7A7A7A",
                        paddingTop: "5px",
                        paddingBottom: "15px",
                        position: "relative",
                        fontSize: "13px",
                        textTransform: "capitalize",
                      }}
                    >
                      By Timbur Hood
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "#393280", marginTop: "5%" }}
                    >
                      Birds gonna be happy
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#7A7A7A" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed eu feugiat amet, libero ipsum enim pharetra hac.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#EF6B4A",
                        marginTop: "5%",
                        fontWeight: "700",
                        fontSize: "23px",
                      }}
                    >
                     ${book.price}
                    </Typography>
                    <div className="btnBox">
                      <Button
                        // onClick={navigateToAllCategories}
                        variant="outlined"
                        sx={{
                          borderColor: "#393280",
                          color: "#393280",
                        }}
                      >
                        View more <FaLongArrowAltRight className="ms-2" />
                      </Button>
                    </div>
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
