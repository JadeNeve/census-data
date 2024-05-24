import React, { useState, useEffect } from 'react';
import { Dialog, TextField, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const EditMemberDetailsModal = ({ open, onClose, memberData, onSave }) => {
  const [formData, setFormData] = useState({
    Name1: '',
    Surname: ''
  });

  useEffect(() => {
    if (memberData) {
      setFormData({
        Name1: memberData.Name1,
        Surname: memberData.Surname
      });
    }
  }, [memberData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMember = { ...memberData, ...formData };
    try {
      await onSave(updatedMember);
      onClose();
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Member Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="Name1"
            label="Name"
            type="text"
            fullWidth
            value={formData.Name1}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Surname"
            label="Surname"
            type="text"
            fullWidth
            value={formData.Surname}
            onChange={handleInputChange}
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberDetailsModal;
