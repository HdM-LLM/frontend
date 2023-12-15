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

export default function UploadPage() {
  const [cover_letter, setCoverLetter] = React.useState<File | null>(null);
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

  const pdfs = new FormData();

  const sendFiles = async () => {
    if (!cover_letter || !selectedVacancy) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      try {
        await API.getAPI().addPdfs(cover_letter, selectedVacancy);
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

  const isSendButtonDisabled = !cover_letter || selectedVacancy === '';

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h1>File Upload</h1>
      <h4>Cover Letter</h4>
      <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row' }}>
        <TextField
          disabled
          id="cover_letter-input"
          label="Cover Letter"
          defaultValue="Insert File here"
          size="small"
          sx={{ width: '300px', marginRight: 2}}
          value={cover_letter?.name}
        />
        <Button
          size="small"
          variant="contained"
          component="label"
          color="secondary"
          sx={{ width: '100px',  height: '40px' }}
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
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
        <FormControl sx={{ width: 300}} size="small">
          <InputLabel id="vacancy-label" >Vacancy</InputLabel>
          <Select
              labelId="select-vacancy-dropdown"
              label="Select Vacancy"
              value={selectedVacancy}
              input={<OutlinedInput label="Vacancy" />}
              onChange={handleSelectChange}
              
            >
              {vacancies.map((vacancy) => (
                <MenuItem key={vacancy.id} value={vacancy.id} sx={{ height: '35px' }}>
                  {vacancy.vacancyTitle}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 30 }}>
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          component="label"
          sx={{ width: '100px' }}
          onClick={sendFiles}
          disabled={isSendButtonDisabled}  // Disable the button conditionally
        >
          Send
        </Button>
      </Box>
      {alert ? (
        <Alert severity="error">Oops, something went wrong... Please add files and select a vacancy</Alert>
      ) : (
        <></>
      )}
      {success ? <Alert severity="success">🎉 Files sent successfully!</Alert> : <></>}
    </Container>
  );
}