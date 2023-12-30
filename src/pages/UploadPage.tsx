import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
import { useEffect, useState } from 'react';
import { APP_BAR_HEIGHT } from '../constants';
import { Typography } from '@mui/material';

export default function UploadPage() {
  const [cv, setCv] = useState<File | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [selectedVacancy, setSelectedVacancy] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
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
    setCv(file);
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
    console.log(event.target.value);
    setSelectedVacancy(event.target.value);
  };

  const isSendButtonDisabled = !cv || selectedVacancy === '';

  return (
    <Box
      sx={{
        flex: 1,
        height: 'calc(100vh - APP_BAR_HEIGHT)',
        marginTop: APP_BAR_HEIGHT,
        flexDirection: 'column',
        marginLeft: 3,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={'bold'}
        sx={{ color: '#4d4d4d', marginTop: 10, marginBottom: 3 }}
      >
        Upload your application
      </Typography>
      <Typography variant="h6" sx={{ color: '#4d4d4d', marginBottom: 2 }}>
        Select the vacancy you are applying for
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
        <FormControl sx={{ width: 300 }} size="small">
          <InputLabel id="vacancy-label">Vacancy</InputLabel>
          <Select
            labelId="select-vacancy-dropdown"
            label="Select Vacancy"
            value={selectedVacancy}
            input={<OutlinedInput label="Vacancy" />}
            onChange={handleSelectChange}
          >
            {vacancies.map((vacancy) => (
              <MenuItem key={vacancy.id} value={vacancy.id} sx={{ height: '35px' }}>
                {vacancy.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography variant="h6" sx={{ color: '#4d4d4d', marginBottom: 2 }}>
        Upload your CV
      </Typography>
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
    </Box>
  );
}
