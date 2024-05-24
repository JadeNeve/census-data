import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const FilterBySelectionModal = ({ open, handleClose, selectedItems, updateUserData }) => {
  const [editedItems, setEditedItems] = useState(selectedItems);

  const handleStatusChange = (e, index) => {
    const newItems = [...editedItems];
    newItems[index].status = e.target.value;
    setEditedItems(newItems);
  };

  const handlePrstAdminSortNameChange = (e, index) => {
    const newItems = [...editedItems];
    newItems[index].prstAdminSortName = e.target.value;
    setEditedItems(newItems);
  };

  const handlePlaceChange = (e, index) => {
    const newItems = [...editedItems];
    newItems[index].place = e.target.value;
    setEditedItems(newItems);
  };

  const handleCenGroupChange = (e, index) => {
    const newItems = [...editedItems];
    newItems[index].CenGroup = e.target.value;
    setEditedItems(newItems);
  };

  const handleSave = () => {
    updateUserData(editedItems);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Selected Items</DialogTitle>
      <DialogContent>
        {editedItems.map((item, index) => (
          <div key={item.IDNO}>
            <TextField
              select
              label="Status"
              value={item.status}
              onChange={(e) => handleStatusChange(e, index)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="transitional">Transitional</MenuItem>
            </TextField>
            <TextField
              label="prstAdminSortName"
              value={item.prstAdminSortName}
              onChange={(e) => handlePrstAdminSortNameChange(e, index)}
            />
            <TextField
              label="Place"
              value={item.place}
              onChange={(e) => handlePlaceChange(e, index)}
            />
            <TextField
              label="CenGroup"
              value={item.CenGroup}
              onChange={(e) => handleCenGroupChange(e, index)}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterBySelectionModal;
