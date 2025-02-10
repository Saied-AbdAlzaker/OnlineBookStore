import {
  Box,
  Typography,
  Card,
  Button,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLongArrowAltRight,
  FaTwitter,
} from "react-icons/fa";
import articles1 from "../../../../assets/Image/Articles/articles1.png";
import articles2 from "../../../../assets/Image/Articles/articles2.png";
import articles3 from "../../../../assets/Image/Articles/articles3.png";
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DASHBOARD } from "../../../../Constants/END_POINTS";
import { HomeDetails } from "../../Models/Dashboard";

export default function Articles() {

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

  const ArticlesImg = [
    { src: articles1, alt: "articles1" },
    { src: articles2, alt: "articles2" },
    { src: articles3, alt: "articles3" },
  ];

  const formatDate = (dateString: any) => {
    return moment(dateString).format("MMMM DD, YYYY hh:mm A");
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#F7FCFC", mb: 5 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            margin: "auto",
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Read our articles
          </Typography>
          <Typography
            variant="h3"
            className="lineHorizontal position-relative"
            sx={{ color: "#173F5F" }}
          >
            Latest Articles
          </Typography>
        </Box>

        <Typography className="featureContent">
          {products?.slice(0, 3).map((book, index) => {
            return (
              <>
                <Card sx={{ maxWidth: 345 }}>
                  {book?.image ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={ArticlesImg[index].src}
                      alt={ArticlesImg[index].alt}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="300"
                      image={ArticlesImg[index].src}
                      alt={ArticlesImg[index].alt}
                    />
                  )}

                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", textAlign: "start" }}
                    >
                      {formatDate(book?.createdAt)}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: "#173F5F" }}
                    >
                      {book.description}
                    </Typography>
                    <hr />
                    <CardContent
                      sx={{ color: "#173F5F", textAlign: "end", p: 0 }}
                    >
                      <FaFacebook className="cursor" />
                      <FaInstagram className="mx-2 cursor" />
                      <FaLinkedin className="cursor" />
                      <FaTwitter className="mx-3 cursor" />
                    </CardContent>
                  </CardContent>
                </Card>
              </>
            );
          })}
        </Typography>
        <div className="text-center my-3 py-3">
          <Button
            // onClick={navigateToAllCategories}
            variant="outlined"
            sx={{
              borderColor: "#173F5F",
              color: "#173F5F",
              marginBottom: "10px",
              marginRight: "10px",
            }}
          >
            read all articles <FaLongArrowAltRight className="ms-2" />
          </Button>
        </div>
      </Box>
    </>
  );
}
