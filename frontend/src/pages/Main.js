import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";


const Home = () => {
  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          // backgroundImage: `url(${clouds})`,
          backgroundColor: "text.secondary",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h3" gutterBottom>
          MAIN
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          MAINN
        </Button>
      </Box>

    </div>
  );
};

export default Home;
