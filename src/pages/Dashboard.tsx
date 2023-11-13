import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

export default function Dashboard() {
  const MainBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: theme.palette.grey[100],
    boxShadow: "none",
  }));

  return (
    <MainBox component="main">
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            ></Paper>
          </Grid>
          {/* Recent Applications */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            ></Paper>
          </Grid>
          {/* Recent Applicants */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
            ></Paper>
          </Grid>
        </Grid>
      </Container>
    </MainBox>
  );
}
