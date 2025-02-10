import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { DASHBOARD } from "../../../../Constants/END_POINTS";
import category1 from "../../../../assets/Image/Category/Categry1.png";
import category2 from "../../../../assets/Image/Category/Categry2.png";
import category3 from "../../../../assets/Image/Category/Categry3.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CategoryDetails } from "../../Models/Dashboard";

export default function AllCategories() {

  const CategoryImg = [
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category3, alt: "category3" },
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category3, alt: "category3" },
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category3, alt: "category3" },
    { src: category1, alt: "category1" },
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category3, alt: "category3" },
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category3, alt: "category3" },
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
    { src: category1, alt: "category1" },
    { src: category2, alt: "category2" },
  ];

  const [category, setCategory] = useState<CategoryDetails[]>([]);

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
      <Box>
        <Typography variant="h4" sx={{ color: "#EF6B4A", textAlign: "center" }}>
          Explore our Categories
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: 2,
            mt: 3,
            mb: 3,
            p: 5,
          }}
        >
          {category?.slice(0, 20).map((category, index) => (
            <>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {category?.books?.image ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={category?.books?.image}
                      alt={category?.books?.name}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="300"
                      image={CategoryImg[index].src}
                      alt={CategoryImg[index].alt}
                    />
                  )}
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ alignItems: "center", color: "#393280" }}
                    >
                      {category?.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ alignItems: "center", color: "#393280" }}
                    >
                      {category?.books?.price}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ alignItems: "center", color: "#393280" }}
                    >
                      {category?.books?.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
}
