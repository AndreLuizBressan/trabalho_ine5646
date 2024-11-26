import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

const DestinationCard = ({ title, image, description }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Saiba Mais
        </Button>
      </CardActions>
    </Card>
  );
};

export default DestinationCard;
