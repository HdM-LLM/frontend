import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function UploadPage() {
  const [cover_letter, setCoverLetter] = React.useState<File | null>(null);
  const [resume, setResume] = React.useState<File | null>(null);

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h1>File Upload</h1>
      <Box sx={{ display: "flex", mb: 2 }}>
        <h4>Cover Letter</h4>
        <Button variant="contained" component="label" sx={{ ml: 5 }}>
          Upload
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files) return;
              setCoverLetter(event.target.files[0]);
            }}
          />
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        <h4>Resume</h4>
        <Button variant="contained" component="label" sx={{ ml: 5 }}>
          Upload
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files) return;
              setResume(event.target.files[0]);
            }}
          />
        </Button>
      </Box>
    </Container>
  );
}
