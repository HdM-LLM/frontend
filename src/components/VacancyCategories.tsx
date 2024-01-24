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
  InputAdornment,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CategorySelector from './VacancyCategorySelection';
import ColoredChip from './CategoryChip';
import { Category } from '../types/category';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

type VacancyCategoriesProps = {
  onNext: (selectedCategories: Category[]) => void;
  onSelectedCategoriesChange: (categories: Category[]) => void;
  categories: Category[]; // Add categories prop
};

const VacancyCategories: React.FC<VacancyCategoriesProps> = ({
  onNext,
  onSelectedCategoriesChange,
  categories: parentCategories, // Use categories prop from parent
}) => {
  const [categories, setCategories] = useState<Category[]>(parentCategories);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    setCategories(parentCategories);
  }, [parentCategories]);

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== categoryId);
    setCategories(updatedCategories);

    // Notify the parent component about the changes
    onSelectedCategoriesChange(
      updatedCategories.map((category) => ({
        name: category.name,
        id: category.id,
        weight: category.weight || 0,
        chip: category.chip,
      }))
    );
  };

  const handleWeightChange = (categoryId: string, value: number) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, weight: value } : cat
    );
    setCategories(updatedCategories);

    onSelectedCategoriesChange(
      updatedCategories.map((category) => ({
        name: category.name,
        id: category.id,
        weight: category.weight || 0,
        chip: category.chip,
      }))
    );
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
      // Calculate the total weight of the unlocked categories
      const updatedCategories = categories.map((cat, index) => {
        if (!cat.locked && cat.weight !== undefined && cat.weight !== null) {
          const adjustedWeight =
            index === 0
              ? +(equalWeight + (remainingWeight % totalUnlockedCategories)).toFixed(2)
              : equalWeight;
          return { ...cat, weight: adjustedWeight };
        }
        return cat;
      });

      // Calculate the adjustment based on the difference between the target total weight and the sum of the calculated weights
      const adjustment = +(
        100 - updatedCategories.reduce((total, cat) => total + (cat.weight || 0), 0)
      ).toFixed(2);

      if (adjustment !== 0) {
        // Adjust the first unlocked category to make the total exactly 100%
        const firstUnlockedCategory = updatedCategories.find((cat) => !cat.locked);

        if (firstUnlockedCategory) {
          firstUnlockedCategory.weight = +(
            (firstUnlockedCategory.weight || 0) + adjustment
          ).toFixed(2);
        }
      }

      // Update the state with the calculated weights
      setCategories(updatedCategories);

      // Notify the parent component about the changes
      onSelectedCategoriesChange(
        updatedCategories.map((category) => ({
          name: category.name,
          id: category.id,
          weight: category.weight || 0,
          chip: category.chip,
        }))
      );
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: '1vh', color: '#8a8a8a' }}>
        Please select the skills required for the vacancy.
      </Typography>
      <Stack spacing={2}>
        <Grid container spacing={0} alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={handleOpenDialog}
              size="small"
            >
              Select Skills
            </Button>
          </Grid>
        </Grid>
        <Box
          border={1}
          borderRadius={4}
          borderColor={'#f5f5f5'}
          sx={{ backgroundColor: '#f5f5f5' }}
          padding={2}
        >
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
              <Grid container key={category.id} alignItems="center" spacing={3}>
                <Grid item>
                  <IconButton
                    onClick={() => handleDeleteCategory(category.id)}
                    color="primary"
                    size="small"
                  >
                    <HighlightOffRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    label="Weight"
                    value={category.weight || ''}
                    onChange={(weightValue) =>
                      handleWeightChange(category.id, +weightValue.target.value)
                    }
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
            <Typography variant="h6" sx={{ fontSize: 18, marginRight: 2 }}>
              {categories.length === 0
                ? 'No skills selected.'
                : 'Total Weight: ' +
                  categories
                    .reduce((total, category) => total + (category.weight || 0), 0)
                    .toFixed(0) +
                  '%'}
            </Typography>
            {categories.length === 0 ? null : (
              <Button variant="outlined" color="primary" onClick={handleAutoWeight} size="small">
                Auto Weight
              </Button>
            )}
          </Box>
        </Box>
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>Skill Selection</DialogTitle>
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

export default VacancyCategories;
