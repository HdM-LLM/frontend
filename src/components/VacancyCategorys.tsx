import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import CategorySelector from './VacancyCategorySelection';
import ColoredChip from './CategoryChip';
import { Category } from '../types/category';


type VacancyCategorysProps = {
  onNext: (selectedCategories: Category[]) => void;
  onSelectedCategoriesChange: (categories: Category[]) => void;
  categories: Category[];  // Add categories prop
};

const columns: GridColDef[] = [
  {
    field: 'chip',
    headerName: 'Chip',
    width: 80,
    renderCell: (params: GridCellParams) => <ColoredChip label={params.value as string} />,
  },
  { field: 'name', headerName: 'Name', flex: 1 },
];


const VacancyCategorys: React.FC<VacancyCategorysProps> = ({
  onNext,
  onSelectedCategoriesChange,
  categories: parentCategories,  // Use categories prop from parent
}) => {
  const [categories, setCategories] = useState<Category[]>(parentCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedCategoriesForRemoval, setSelectedCategoriesForRemoval] = useState<string[]>([]);

  useEffect(() => {
    setCategories(parentCategories);
  }, [parentCategories]);



  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== categoryId);
    setCategories(updatedCategories);
    
    // Notify the parent component about the changes
    onSelectedCategoriesChange(updatedCategories.map((category) => ({
      name: category.name,
      id: category.id,
      weight: category.weight || 0,
      chip: category.chip, 
    })));
  };

  const handleWeightChange = (categoryId: string, value: number) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, weight: value } : cat
    );
    setCategories(updatedCategories);
  
    onSelectedCategoriesChange(updatedCategories.map((category) => ({
      name: category.name,
      id: category.id,
      weight: category.weight || 0,
      chip: category.chip, 
    })));
  };

  const handleToggleLock = (categoryId: string) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, locked: !cat.locked } : cat
    );
    setCategories(updatedCategories);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCategorySelection = (selectedCategories: Category[]) => {
    if (selectedCategories.length > 0) {
      const newCategories: Category[] = selectedCategories.map((category) => ({
        name: category.name,
        id: category.id,
        weight: category.weight || 0,
        chip: category.chip,
      }));

      setCategories((prevCategories) => [...prevCategories, ...newCategories]);
      onSelectedCategoriesChange([...parentCategories, ...newCategories]);
    }
  };


  const handleAutoWeight = () => {
    const lockedCategories = categories.filter((cat) => cat.locked);
    const unlockedCategories = categories.filter((cat) => !cat.locked);
  
    const totalLockedWeight = lockedCategories.reduce((total, cat) => total + (cat.weight || 0), 0);
    const totalUnlockedCategories = unlockedCategories.length;
  
    if (totalUnlockedCategories > 0) {
      const remainingWeight = 100 - totalLockedWeight;
  
      // Calculate equal weight without adjusting
      const equalWeight = +(remainingWeight / totalUnlockedCategories).toFixed(2);
  
      const updatedCategories = categories.map((cat, index) => {
        if (!cat.locked && cat.weight !== undefined && cat.weight !== null) {
          const adjustedWeight = index === 0 ? +(equalWeight + remainingWeight % totalUnlockedCategories).toFixed(2) : equalWeight;
          return { ...cat, weight: adjustedWeight };
        }
        return cat;
      });
  
      // Calculate the adjustment based on the difference between the target total weight and the sum of the calculated weights
      const adjustment = +(100 - updatedCategories.reduce((total, cat) => total + (cat.weight || 0), 0)).toFixed(2);
  
      if (adjustment !== 0) {
        // Adjust the first unlocked category to make the total exactly 100%
        const firstUnlockedCategory = updatedCategories.find((cat) => !cat.locked);
  
        if (firstUnlockedCategory) {
          firstUnlockedCategory.weight = +((firstUnlockedCategory.weight || 0) + adjustment).toFixed(2);
        }
      }
  
      // Update the state with the calculated weights
      setCategories(updatedCategories);
  
      // Notify the parent component about the changes
      onSelectedCategoriesChange(updatedCategories.map((category) => ({
        name: category.name,
        id: category.id,
        weight: category.weight || 0,
        chip: category.chip, 
      })));
    }
  };
  
  

  

  return (
    <Box>
      <Stack spacing={2}>
        <Typography sx={{ color: '#B3B3B3', fontSize: '0.8rem' }}>Category Selection</Typography>

        <Grid container spacing={0} alignItems="center">
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleOpenDialog} size="small">
              Select Category
            </Button>
          </Grid>
        </Grid>
        <Box border={1} borderRadius={4} padding={2}>
          {categories.map((category) => (
            <Box
              key={category.id}
              border={1}
              borderRadius={10}
              borderColor="#f0f0f0"
              padding={1}
              marginBottom={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="0.8rem"
            >
              <Grid container key={category.id} alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton onClick={() => handleDeleteCategory(category.id)} color="primary" size="small">
                    X
                  </IconButton>
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    label="Weight"
                    value={category.weight || ''}
                    onChange={(e) => handleWeightChange(category.id, +e.target.value)}
                    style={{ width: '105px' }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    sx={{ textAlign: 'right' }}
                    size="small"
                    disabled={category.locked}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleToggleLock(category.id)} size="small">
                    {category.locked ? <LockIcon /> : <LockOpenIcon />}
                  </IconButton>
                </Grid>
                <Grid item>{category.name}</Grid>
                <Grid item>
                  <ColoredChip label={category.chip} size="small" />
                </Grid>

              </Grid>
            </Box>
          ))}
        <Box display="flex" alignItems="center">
          <Typography variant="h6" fontSize="0.9rem" marginRight={2}>
            Total Weight: {categories.reduce((total, cat) => total + (cat.weight || 0), 0).toFixed(2)}%
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleAutoWeight} size="small">
            Auto Weight
          </Button>
        </Box>
        </Box>
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>Category Selection</DialogTitle>
          <DialogContent>
            <CategorySelector
              selectedCategories={categories}
              onCategorySelection={handleCategorySelection}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default VacancyCategorys;
