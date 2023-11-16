import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function InquiriesPage() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <h1>Inquiries</h1>
      </Container>
    </Box>
  );
}
