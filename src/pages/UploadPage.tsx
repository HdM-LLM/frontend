import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import API from "../api/api";
import Alert from "@mui/material/Alert";

export default function UploadPage() {
  const [cover_letter, setCoverLetter] = React.useState<File | null>(null);
  const [resume, setResume] = React.useState<File | null>(null);
  const [alert, setAlert] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const pdfs = new FormData();

  const sendFiles = () => {
    if (cover_letter == null || resume == null) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      pdfs.append("cover_letter", cover_letter);
      pdfs.append("resume", resume);
      //API.getAPI().addPdfs(pdfs);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h1>File Upload</h1>
      <h4>Cover Letter</h4>
      <Box sx={{ display: "flex", mb: 2, flexDirection: "row" }}>
        <TextField
          disabled
          id="cover_letter-input"
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
        >
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
      <h4>Resume</h4>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 4 }}>
        <TextField
          disabled
          id="resume-input"
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
        >
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
      <Box sx={{ display: "flex", flexDirection: "row", mb: 30 }}>
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          component="label"
          sx={{ width: "100px" }}
          onClick={sendFiles}
        >
          Send
        </Button>
      </Box>
      {alert ? (
        <Alert severity="error">
          Oops, something went wrong... Please add files
        </Alert>
      ) : (
        <></>
      )}
      {success ? (
        <Alert severity="success">🎉 Files send successfully!</Alert>
      ) : (
        <></>
      )}
    </Container>
  );
}
