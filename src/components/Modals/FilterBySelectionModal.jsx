import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const FilterBySelectionModal = ({ open, handleClose, selectedItems, updateUserData }) => {
    const [editedItems, setEditedItems] = useState([]);

    useEffect(() => {
        setEditedItems(selectedItems);
    }, [selectedItems]);

    const handleInputChange = (e, index, field) => {
        const newItems = [...editedItems];
        newItems[index][field] = e.target.value;
        setEditedItems(newItems);
    };

    const handleSave = () => {
        updateUserData(editedItems);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Selected Members</DialogTitle>
            <DialogContent>
                {editedItems.map((item, index) => (
                    <div key={item.IDNO} style={{ marginBottom: '10px' }}>
                        <TextField
                            label="First Name"
                            value={item.Name1}
                            onChange={(e) => handleInputChange(e, index, 'Name1')}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Surname"
                            value={item.Surname}
                            onChange={(e) => handleInputChange(e, index, 'Surname')}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            select
                            label="Status"
                            value={item.status || ''}
                            onChange={(e) => handleInputChange(e, index, 'status')}
                            fullWidth
                            margin="dense"
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="transitional">Transitional</MenuItem>
                        </TextField>
                        <TextField
                            label="prstAdminSortName"
                            value={item.prstAdminSortName || ''}
                            onChange={(e) => handleInputChange(e, index, 'prstAdminSortName')}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Place"
                            value={item.place || ''}
                            onChange={(e) => handleInputChange(e, index, 'place')}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="CenGroup"
                            value={item.CenGroup || ''}
                            onChange={(e) => handleInputChange(e, index, 'CenGroup')}
                            fullWidth
                            margin="dense"
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
