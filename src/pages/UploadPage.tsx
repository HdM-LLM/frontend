import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import API from '../api/api';
import Alert from '@mui/material/Alert';
import { Vacancy } from '../types/vacancy';
import { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DropZone } from '../components/DropZone';

export default function UploadPage() {
  const [cv, setCV] = React.useState<File | null>(null);
  const [vacancies, setVacancies] = React.useState<Vacancy[]>([]);
  const [selectedVacancy, setSelectedVacancy] = React.useState<string>('');
  const [alert, setAlert] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const api = API.getAPI();
        const vacancyData = await api.fetchVacancies();
        setVacancies(vacancyData);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };

    fetchVacancies();
  }, []);

  const setFile = (file: File) => {
    setCV(file);
    setSuccess(true);
  };

  const sendFiles = async () => {
    if (!cv || !selectedVacancy) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      try {
        await API.getAPI().addPdfs(cv, selectedVacancy);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } catch (error) {
        // Handle error if the API call fails
        console.error('Error sending files:', error);
      }
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedVacancy(event.target.value);
  };

  const isSendButtonDisabled = !cv || selectedVacancy === '';

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h1>File Upload</h1>
      <h4>CV</h4>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
        <DropZone setFile={setFile} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 30 }}>
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          component="label"
          sx={{ width: '100px' }}
          onClick={sendFiles}
          disabled={isSendButtonDisabled} // Disable the button conditionally
          disableElevation
        >
          Send
        </Button>
      </Box>
      {alert ? (
        <Alert severity="error">Oops, something went wrong... Try again later.</Alert>
      ) : (
        <></>
      )}
      {success ? <Alert severity="success">🎉 Files sent successfully!</Alert> : <></>}
    </Container>
  );
}
