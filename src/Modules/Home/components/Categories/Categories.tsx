import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { DASHBOARD, imgPath } from "../../../../Constants/END_POINTS";
import category1 from "../../../../assets/Image/Category/Categry1.png";
import category2 from "../../../../assets/Image/Category/Categry2.png";
import category3 from "../../../../assets/Image/Category/Categry3.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CategoryDetails } from "../../Models/Dashboard";

export default function Categories() {
  let navigate = useNavigate();

  let navigateToAllCategories = () => {
    navigate("/dashboard/allCategories");
  };

  const CategoryImg = [
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category3, alt: "category3" },
  ];

  let [category, setCategory] = useState<CategoryDetails[]>([]);

  let getAllCategories = async () => {
    try {
      let response = await axios.get(DASHBOARD.category)
      setCategory(response.data);
      console.log(response.data.books);

    } catch (error) {
      toast.error('Error!')
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [])


  return (
    <>
      <div className="ms-5">
        <Typography
          variant="subtitle1"
          sx={{ color: "#EF6B4A", position: "relative", marginLeft: "5%" }}
        >
          Categories
        </Typography>
        <Typography variant="h4" sx={{ color: "#393280" }}>
          Explore our Top Categories
        </Typography>
        <span className="line"></span>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: 2,
            mt: 3,
            mb: 3,
          }}
        >
          {category.splice(0, 3).map((category,index) => (
            <>
              <Card sx={{ maxWidth: 345 }} key={category?._id}>
                <CardActionArea>
                  {category?.books?.image ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={`${imgPath}/${category?.books?.image}`}
                      alt={category?.books?.name}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="200"
                      image={CategoryImg[index].src}
                      alt={CategoryImg[index].alt}
                    />
                  )}

                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        alignItems: "center",
                        color: "#393280",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      {category?.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          ))}
        </Box>
        <div className="text-center">
          <Button
            onClick={navigateToAllCategories}
            variant="outlined"
            sx={{
              borderColor: "#393280",
              color: "#393280",
              marginBottom: "10px",
            }}
          >
            View more <FaLongArrowAltRight className="ms-2" />
          </Button>
        </div>
      </div>
    </>
  );
}
