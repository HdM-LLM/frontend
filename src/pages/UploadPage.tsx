import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import API from "../api/api";

export default function UploadPage() {
  const [cover_letter, setCoverLetter] = React.useState<File | null>(null);
  const [resume, setResume] = React.useState<File | null>(null);

  const sendCoverLetter = () => {
    if (!cover_letter) {
      return;
    } else {
      API.getAPI().addCoverLetter(cover_letter);
    }
  };
  const sendResume = () => {
    if (!resume) {
      return;
    } else {
      API.getAPI().addResume(resume);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h1>File Upload</h1>
      <h4>Cover Letter</h4>
      <Box sx={{ display: "flex", mb: 2, flexDirection: "row" }}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Cover Letter"
          defaultValue="Insert File here"
          size="small"
          sx={{ width: "300px", marginRight: 2 }}
          value={cover_letter?.name}
        />
        <Button
          size="small"
          variant="contained"
          component="label"
          color="secondary"
          sx={{ width: "100px" }}
          onClick={sendCoverLetter}
        >
          Upload
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files) return;
              setCoverLetter(event.target.files[0]);
              sendCoverLetter();
            }}
          />
        </Button>
      </Box>
      <h4>Resume</h4>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Resume"
          defaultValue="Insert File here"
          size="small"
          sx={{ width: "300px", marginRight: 2 }}
          value={resume?.name}
        />
        <Button
          size="small"
          color="secondary"
          variant="contained"
          component="label"
          sx={{ width: "100px" }}
          onClick={sendResume}
        >
          Upload
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files) return;
              setResume(event.target.files[0]);
              sendResume();
            }}
          />
        </Button>
      </Box>
    </Container>
  );
}
