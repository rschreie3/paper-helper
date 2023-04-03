import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import "./carousel.css";

function MyCarousel(props) {
  var items = [
    {
      image: <img src="./images/define.png" height={500} width={700} />,
      description: "Dictionary",
    },
    {
      image: <img src="./images/translate.png" height={500} width={700} />,
      description: "Translation",
    },
    {
      image: (
        <img src="./images/write_your_paper.png" height={500} width={700} />
      ),
      description: "text editor",
    },
  ];

  return (
    <Carousel
      sx={{
        justifyContent: "center",
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return <Paper classes={{ root: "carousel" }}>{props.item.image}</Paper>;
}

export default MyCarousel;
