import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useElderShip } from '../../contexts/ElderShipContext';

const EditMemberDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { memberData, elderId, priestIndex, familyIndex } = location.state;
    const { updateElderShip } = useElderShip();

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
            // Fetch the specific ElderShip
            const response = await axios.get(`http://localhost:3001/ElderShip/${elderId}`);
            const elderShip = response.data;

            // Update the specific member within the ElderShip's nested structure
            const updatedMembers = elderShip.priests[priestIndex].families[familyIndex].members.map((member) =>
                member.IDNO === updatedMember.IDNO ? updatedMember : member
            );
            elderShip.priests[priestIndex].families[familyIndex].members = updatedMembers;

            // Send PUT request to update the entire ElderShip
            await axios.put(`http://localhost:3001/ElderShip/${elderId}`, elderShip);

            // Update the global state
            updateElderShip(elderShip);
            console.log('ElderShip updated', updatedMember)

        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Edit Member Details</Typography>
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
                <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
                    Update
                </Button>
            </form>
        </Container>
    );
};

export default EditMemberDetails;
