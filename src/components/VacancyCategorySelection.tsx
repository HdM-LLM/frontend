import React, { useState, useEffect } from 'react';
import API from '../api/api';
import {
  DataGrid,
  GridColDef,
  GridRowId,
  DataGridProps,
  GridCellParams,
} from '@mui/x-data-grid';
import ColoredChip from './CategoryChip';
import {
  Chip,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Category } from '../types/category';

type ExpectedCategoryType = {
  Name: string;
  Chip: string;
  Guideline_0: string;
  Guideline_1: string;
  // Add other properties as needed
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
    headerName: 'Chip',
    width: 180,
    renderCell: (params: GridCellParams) => <ColoredChip label={(params.value as string) || ''} />,
  },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onCategorySelection,
  onClose,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] =
    useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [backendMessage, setBackendMessage] = useState<string>('');
  const [guideline_0, setGuideline_0] = useState<string>('');
  const [guideline_10, setGuideline_10] = useState<string>('');
  const [addedChip, setAddedChip] = useState<string>('');
  const [chipAssigned, setChipAssigned] = useState(false);
  const [guidelineCalculated, setGuidelineCalculated] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false);
  
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
  const handleAddNewCategory = async () => {
    try {
      // Reset state
      setBackendMessage('');
      setLoading(true);
  
      // Step 1: Add chip to category
      const addedChipResult = await API.getAPI().getChipForCategory(
        newCategoryName
      );
      const addedChip = addedChipResult?.data.category ?? '';
      setAddedChip(addedChip);
  
      // Set success status for the step
      setChipAssigned(true);
  
      // Step 2: Calculate guideline
      const response = await API.getAPI().getCategoryGuidelines(
        newCategoryName
      );
      setGuideline_0(response.data.guideline_for_zero);
      setGuideline_10(response.data.guideline_for_ten);
  
      // Set success status for the step
      setGuidelineCalculated(true);
  
      // Combine information for the final category
      const finalCategory: ExpectedCategoryType = {
        Name: newCategoryName,
        Chip: addedChip,
        Guideline_0: guideline_0,
        Guideline_1: guideline_10,
      };
  
      // Step 3: Add the final category to the backend
      const addCategoryResponse = await API.getAPI().addCategory(finalCategory);
  
      // Set success status for the step
      setCategoryAdded(true);
    
      // Stop loading
      setLoading(false);
  
      // Update categories
      fetchCategories();
  
      // Close the "Create a new category" dialog
      setIsNewCategoryDialogOpen(false);

    } catch (error) {
      console.error('Error adding a new category:', error);
      setLoading(false);
    }
  };

  const handleDoneButtonClick = () => {
    const newSelectedCategories = selectedRows
      .map((uuid) => categories.find((cat) => cat.id === uuid)!)
      .filter((category) => category)
      .map((category) => ({
        ...category!,
        weight: 20,
      }))
      .filter(
        (category) =>
          !selectedCategories.some((cat) => cat.id === category!.id)
      );

    onCategorySelection(newSelectedCategories);
    onClose();
  };

  const handleSelectionModelChange = (newSelection: GridRowId[]) => {
    setSelectedRows(newSelection);
  };

  const handleCreateNewCategoryClick = () => {
    setIsNewCategoryDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsNewCategoryDialogOpen(false);
    setNewCategoryName('');
    setBackendMessage('');
    setLoading(false);
    setChipAssigned(false);  
    setGuidelineCalculated(false);  
    setCategoryAdded(false);  
  };

  const StepWithLoadingCircle: React.FC<{ loading: boolean; success: boolean; text: string }> = ({ loading, success, text }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {loading ? <CircularProgress /> : <CheckCircleIcon style={{ color: success ? 'green' : 'inherit', marginRight: '8px' }} />}
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box display="flex" sx={{ paddingTop: 2, paddingBottom: 1 }}>
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
          color="secondary"
          onClick={handleCreateNewCategoryClick}
        >
          Create a new category
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleDoneButtonClick}
        >
          Done
        </Button>
      </Box>

      {/* Dialog for creating a new category */}
      <Dialog
        open={isNewCategoryDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create a new category</DialogTitle>
        <DialogContent >
          <TextField
            label="Name of the category"
            variant="outlined"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            sx={{marginTop:'10px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            style={{ marginRight: 'auto' }}
          >
            Cancel
          </Button>
          <Button onClick={handleAddNewCategory} color="secondary">
            Add new category
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
          <DialogTitle>Adding category: '{newCategoryName}'</DialogTitle>
          <DialogContent
            style={{
              position: 'relative',
              padding: '20px',
              maxHeight: '30vh',
              overflowY: 'auto',
            }}
          >
            {loading && !chipAssigned && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress />
                <p>{`Assigning chip for ${newCategoryName}...`}</p>
              </div>
            )}
            {chipAssigned && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon style={{ color: 'green', marginRight: '8px' }} />
                <p>{`Assigned `}</p>
                <ColoredChip label={addedChip} style={{ marginLeft: '4px', marginRight: '8px' }} />,
                <p>{` to the category ${newCategoryName}.`}</p>
              </div>
            )}
            {loading && !guidelineCalculated && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress />
                <p>{`Assigning rating guidelines for ${newCategoryName}...`}</p>
              </div>
            )}
            {guidelineCalculated && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon style={{ color: 'green', marginRight: '8px' }} />
                <p>{`Assigned guidelines 0 and 10 for ${newCategoryName}.`}</p>
              </div>
            )}
            {categoryAdded && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon style={{ color: 'green', marginRight: '8px' }} />
                <p>{`Category ${newCategoryName} is now available.`}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="outlined" style={{ margin: 'auto', width: '150px', display: 'block' }}>
            Done
          </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
};

export default CategorySelector;
