import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { DASHBOARD, imgPath } from "../../../../Constants/END_POINTS";
import book1 from "../../../../assets/Image/Books/book1.png";
import book2 from "../../../../assets/Image/Books/book2.png";
import book3 from "../../../../assets/Image/Books/book3.png";
import book4 from "../../../../assets/Image/Books/book4.png";
import book5 from "../../../../assets/Image/Books/book5.png";
import book6 from "../../../../assets/Image/Books/book6.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineGridView } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomeDetails } from "../../Models/Dashboard";
import { toast } from "react-toastify";

export default function Release() {

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
    { src: book4, alt: "book4" },
    { src: book5, alt: "book5" },
    { src: book6, alt: "book6" },
  ];
  return (
    <>
      <Box sx={{ backgroundColor: "#FCECEC" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            margin: "auto",
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "#7A7A7A" }}>
            Some quality items
          </Typography>
          <Typography
            variant="h3"
            className="lineHorizontal position-relative"
            sx={{ color: "#393280", fontSize: "38px" }}
          >
            New Release Books
          </Typography>
        </Box>

        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper p-4"
        >
          {products?.slice(0, 6).map((book, index) => {
            return (
              <SwiperSlide key={book._id}>
                <Card sx={{ padding: "20px 0px",position:"relative" }}>
                  {book?.image ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={BooksImg[index].src}
                      alt={BooksImg[index].alt}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="300"
                      image={`${imgPath}/${book?.image}`}
                      alt={book?.name}
                    />
                  )}
                </Card>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    margin: "auto",
                    textAlign: "center",
                    padding: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#393280" }}>
                    {book?.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#7A7A7A" }}>
                    {book?.author}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#EF6B4A" }}>
                    ${book?.price}
                  </Typography>
                </Box>
                <Typography
                    sx={{
                      textAlign: "center",
                      mb: 5,
                      position: "absolute",
                      top: "30%",
                      left: "15%",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#EF6B4A", pl: 3, pr: 3 }}
                    >
                      Add to cart <IoIosAdd size={30} className="ms-2" />
                    </Button>
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      mb: 5,
                      position: "absolute",
                      top: "40%",
                      left: "15%",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#EF6B4A", pl: 3, pr: 3 }}
                    >
                      View details 
                      <MdOutlineGridView size={25} className="ms-2" />
                    </Button>
                  </Typography>
              </SwiperSlide>
            );
          })}
          <hr />
        </Swiper>
        <Typography className="text-end p-2">
          <Link to={"/dashboard/allProduct"} className="relaseLink">
            View all products <FaLongArrowAltRight className="ms-2" />
          </Link>
        </Typography>
      </Box>
    </>
  );
}
