import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import book1 from "../../../../assets/Image/Books/book1.png";
import book2 from "../../../../assets/Image/Books/book2.png";
import book3 from "../../../../assets/Image/Books/book3.png";
import book4 from "../../../../assets/Image/Books/book4.png";
import book5 from "../../../../assets/Image/Books/book5.png";
import book6 from "../../../../assets/Image/Books/book6.png";
import { DASHBOARD, imgPath } from "../../../../Constants/END_POINTS";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineGridView } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HomeDetails } from "../../Models/Dashboard";

export default function AllProduct() {
  const [products, setProducts] = useState<HomeDetails[]>([]);

  async function getAllProducts() {
    try {
      const response = await axios.get(DASHBOARD.books);
      setProducts(response.data.data)
    } catch (error) {
      toast.error("Api Failed Fetch");
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
    { src: book1, alt: "book1" },
    { src: book2, alt: "book2" },
    { src: book3, alt: "book3" },
    { src: book4, alt: "book4" },
    { src: book5, alt: "book5" },
    { src: book6, alt: "book6" },
  ];

  return (
    <>
      <Grid2 container spacing={{ md: 2 }}>
        <Box
          sx={{
            backgroundColor: "#FFE5E5",
            padding: 2,
            display: "flex",
            justifyContent: "center",
            color: "#393280",
            width: "100%",
          }}
        >
          <Link className="nav-link" aria-current="page" to={"/dashboard"}>
            Home /
          </Link>
          <Link
            className="nav-link mx-2"
            aria-current="page"
            to={"/dashboard/allProduct"}
          >
            Books
          </Link>
        </Box>
        <Grid2 size={2}>
          <Box
            sx={{
              color: "#393280",
              paddingLeft: 5,
              borderRight: "1px solid #393280",
            }}
          >
            <Link
              className="nav-link mb-3"
              aria-current="page"
              to={"/dashboard"}
            >
              Price
            </Link>
            <Divider sx={{ backgroundColor: "#393280" }} />
            <Link
              className="nav-link my-3"
              aria-current="page"
              to={"/dashboard"}
            >
              Product type
            </Link>
            <Divider sx={{ backgroundColor: "#393280" }} />
            <Link
              className="nav-link my-3"
              aria-current="page"
              to={"/dashboard"}
            >
              Availability
            </Link>
            <Divider sx={{ backgroundColor: "#393280" }} />
            <Link
              className="nav-link my-3"
              aria-current="page"
              to={"/dashboard"}
            >
              Brand
            </Link>
            <Divider sx={{ backgroundColor: "#393280" }} />
            <Link
              className="nav-link my-3"
              aria-current="page"
              to={"/dashboard"}
            >
              Color
            </Link>
            <Divider sx={{ backgroundColor: "#393280" }} />
            <Link
              className="nav-link my-3"
              aria-current="page"
              to={"/dashboard"}
            >
              Material
            </Link>
            <Divider sx={{ backgroundColor: "#393280" }} />
          </Box>
        </Grid2>
        <Grid2 size={7} offset={1}>
          <Grid2 container spacing={3}>
            {products.map((book, index) => {
              return (
                <Grid2 size={4} key={book?._id} sx={{ position: "relative" }}>
                  <Card sx={{ padding: "20px 0px" }}>
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
                      left: "10%",
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
                      left: "10%",
                    }}
                  >
                    {/* onClick={`/dashboard/bookDetails/${book._id}`} */}
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#EF6B4A", pl: 3, pr: 3 }}
                    >
                      View details
                      <MdOutlineGridView size={25} className="ms-2" />
                    </Button>
                  </Typography>
                </Grid2>
              );
            })}
            <hr />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
