import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { DataGrid, GridColDef, GridRowId, GridCellParams } from '@mui/x-data-grid';
import ColoredChip from './CategoryChip';
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Category } from '../types/category';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/**
 * Defines the structure for props expected by the CategorySelector component.
 * @typedef {Object} CategorySelectorProps
 * @property {Category[]} selectedCategories - The current list of selected categories.
 * @property {(selectedCategories: Category[]) => void} onCategorySelection - Callback function to update the selected categories.
 * @property {() => void} onClose - Callback function to handle the closing of the category selector component.
 */

type ExpectedCategoryType = {
  Name: string;
  Chip: string;
  Guideline_0: string;
  Guideline_1: string;
};

type CategorySelectorProps = {
  selectedCategories: Category[];
  onCategorySelection: (selectedCategories: Category[]) => void;
  onClose: () => void;
};

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  {
    field: 'chip',
    headerName: 'Tag',
    width: 300,
    renderCell: (params: GridCellParams) => <ColoredChip label={(params.value as string) || ''} />,
  },
];

/**
 * Component for selecting and managing categories related to a specific context, such as a vacancy.
 * Allows for the addition of new categories through a dialog interface.
 *
 * @param {CategorySelectorProps} props - The props for the CategorySelector component.
 * @returns {JSX.Element} A component that renders the interface for selecting and adding new categories.
 */
const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onCategorySelection,
  onClose,
}) => {
  // State declarations and initialization
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [backendMessage, setBackendMessage] = useState<string>('');
  const [guideline_0, setGuideline_0] = useState<string>('');
  const [guideline_10, setGuideline_10] = useState<string>('');
  const [addedChip, setAddedChip] = useState<string>('');
  const [chipAssigned, setChipAssigned] = useState(false);
  const [guidelineCalculated, setGuidelineCalculated] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false);

  /**
   * Fetches the list of categories from the backend and updates the component state.
   */
  const fetchCategories = async () => {
    try {
      const response = await fetch(API.getAPI().allCategoriesURL());
      if (response.ok) {
        const data = await response.json();
        setCategories(data); // Assuming your API returns an array of categories
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * Handles the addition of a new category by interacting with the backend services.
   * It performs the necessary steps to add a category, including setting a chip, calculating guidelines, and finalizing the addition.
   */
  const handleAddNewCategory = async () => {
    // Implementation for adding a new category
    try {
      // Reset state
      setBackendMessage('');
      setLoading(true);

      // Step 1: Add chip to category
      let clearCategoryName = newCategoryName.replace(/[^a-zA-Z0-9]/g, '');
      const addedChipResult = await API.getAPI().getChipForCategory(clearCategoryName);
      const addedChip = addedChipResult?.data.category ?? '';
      setAddedChip(addedChip);

      // Set success status for the step
      setChipAssigned(true);

      // Step 2: Calculate guideline
      const response = await API.getAPI().getCategoryGuidelines(clearCategoryName);
      setGuideline_0(response.data.guideline_for_zero);
      setGuideline_10(response.data.guideline_for_ten);

      // Set success status for the step
      setGuidelineCalculated(true);
    } catch (error) {
      console.error('Error adding a new category:', error);
      setLoading(false);
      return;
    }
  };

  // useEffect to handle the construction of finalCategory after guideline state updates
  useEffect(() => {
    const handleFinalCategory = async () => {
      // Ensure that guideline states are updated before proceeding
      if (guidelineCalculated) {
        // Combine information for the final category
        const finalCategory: ExpectedCategoryType = {
          Name: newCategoryName,
          Chip: addedChip,
          Guideline_0: guideline_0,
          Guideline_1: guideline_10,
        };

        try {
          // Step 3: Add the final category to the backend
          const addCategoryResponse = await API.getAPI().addCategory(finalCategory);

          // Set success status for the step
          setCategoryAdded(true);

          // Update categories
          fetchCategories();

          // Close the "Create a new category" dialog
          setIsNewCategoryDialogOpen(false);
        } catch (error) {
          console.error('Error adding a new category:', error);
          setLoading(false);
        }
      }
    };

    handleFinalCategory();
  }, [guidelineCalculated, guideline_0, guideline_10, addedChip, newCategoryName]);

  /**
   * Finalizes the selection process, updating the parent component with the new list of selected categories and closing the selector.
   */
  const handleDoneButtonClick = () => {
    const newSelectedCategories = selectedRows
      .map((uuid) => categories.find((cat) => cat.id === uuid)!)
      .filter((category) => category)
      .map((category) => ({
        ...category!,
        weight: 20,
      }))
      .filter((category) => !selectedCategories.some((cat) => cat.id === category!.id));

    onCategorySelection(newSelectedCategories);
    onClose();
  };

  /**
   * Handles the selection of categories from the grid and updates the selectedRows state.
   * @param {GridRowId[]} newSelection - The new selection of row IDs.
   */
  const handleSelectionModelChange = (newSelection: GridRowId[]) => {
    setSelectedRows(newSelection);
  };

  /**
   * Handles the click event for the "Create a new category" button, opening the dialog for creating a new category.
   */
  const handleCreateNewCategoryClick = () => {
    setIsNewCategoryDialogOpen(true);
  };

  /**
   * Handles the closing of the "Create a new category" dialog, resetting the state and closing the dialog.
   */
  const handleDialogClose = () => {
    setIsNewCategoryDialogOpen(false);
    setNewCategoryName('');
    setBackendMessage('');
    setLoading(false);
    setChipAssigned(false);
    setGuidelineCalculated(false);
    setCategoryAdded(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        display="flex"
        sx={{
          paddingTop: 2,
          paddingBottom: 1,
          justifyContent: 'space-between',
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Box>
      <div style={{ flex: 1, marginBottom: '8px' }}>
        <DataGrid
          rows={categories.filter(
            (category) =>
              !selectedCategories.some((cat) => cat.id === category.id) &&
              (category.name.toLowerCase().includes(filterText.toLowerCase()) ||
                category.chip.toLowerCase().includes(filterText.toLowerCase()))
          )}
          columns={columns}
          checkboxSelection
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          onRowSelectionModelChange={handleSelectionModelChange}
          rowSelectionModel={selectedRows}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCreateNewCategoryClick}
          disableElevation
          startIcon={<AddCircleIcon />}
        >
          New Skill
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleDoneButtonClick}
          disableElevation
        >
          Done
        </Button>
      </Box>

      {/* Dialog for creating a new category */}
      <Dialog open={isNewCategoryDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle>Create a new skill</DialogTitle>
        <DialogContent>
          <TextField
            label="Name of the skill"
            variant="outlined"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            sx={{ marginTop: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" style={{ marginRight: 'auto' }}>
            Cancel
          </Button>
          <Button onClick={handleAddNewCategory} color="secondary">
            Add new skill
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={loading || chipAssigned || guidelineCalculated || categoryAdded}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: { maxHeight: '40vh' },
        }}
      >
        <DialogTitle>Adding skill '{newCategoryName}'</DialogTitle>
        <DialogContent
          style={{
            position: 'relative',
            padding: '20px',
            maxHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          {loading && !chipAssigned && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vh' }}>
              <CircularProgress color="secondary" size={25} />
              <Typography variant="body1" style={{ marginLeft: '0.5vw' }}>
                Assigning tag for '{newCategoryName}'...
              </Typography>
            </div>
          )}
          {chipAssigned && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.7vh' }}>
              <CheckCircleIcon style={{ color: 'green', marginRight: '0.5vw' }} />
              <Typography variant="body1" style={{ marginLeft: '0.5vw' }}>
                Assigned tag
              </Typography>
              <ColoredChip
                label={addedChip}
                style={{ marginLeft: '0.2vw', marginRight: '0.2vw' }}
              />
              <Typography variant="body1">to skill '{newCategoryName}'.</Typography>
            </div>
          )}
          {loading && !guidelineCalculated && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vh' }}>
              <CircularProgress color="secondary" size={25} />
              <Typography variant="body1" style={{ marginLeft: '0.5vw' }}>
                Assigning rating guidelines for '{newCategoryName}'...
              </Typography>
            </div>
          )}
          {guidelineCalculated && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vh' }}>
              <CheckCircleIcon style={{ color: 'green', marginRight: '0.5vw' }} />
              <Typography variant="body1" style={{ marginLeft: '0.5vw' }}>
                Assigned rating guidelines for 0 and 10 points.
              </Typography>
            </div>
          )}
          {categoryAdded && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2vh',
                flexDirection: 'row',
              }}
            >
              <CheckCircleIcon style={{ color: 'green', marginRight: '0.5vw' }} />
              <Typography variant="body1" style={{ marginLeft: '0.5vw' }}>
                Skill '{newCategoryName}' is now available.
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="outlined"
            style={{ margin: 'auto', width: '150px', display: 'block' }}
            disableElevation
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategorySelector;
