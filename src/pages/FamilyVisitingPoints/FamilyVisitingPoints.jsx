import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';
import EditMemberDetailsModal from '../../components/Modals/EditMemberDetailsModal';
import axios from 'axios';
import { useElderShip } from '../../contexts/ElderShipContext';
import usePersistState from '../../hooks/usePersistState';

const FamilyVisitingPoints = () => {
    const { state } = useLocation();
    const { family, elderId, priestIndex, familyIndex } = state || {};
    const { elderShips, updateElderShip } = useElderShip();

    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = usePersistState(family ? family.members : [], 'members-' + elderId + '-' + priestIndex + '-' + familyIndex); // Use the custom hook

    useEffect(() => {
        if (!family) {
            // Fetch the specific ElderShip if family data is not available
            axios.get(`http://localhost:3001/ElderShip/${elderId}`)
                .then(response => {
                    const elderShip = response.data;
                    const priest = elderShip.priests[priestIndex];
                    const familyData = priest.families[familyIndex];
                    setMembers(familyData.members);
                })
                .catch(error => {
                    console.error('Error fetching family data:', error);
                });
        }
    }, [family, elderId, priestIndex, familyIndex, setMembers]);

    const handleModalOpen = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    const handleSave = (updatedMember) => {
        console.log('Updating member:', updatedMember);

        // Update the member in the state
        const updatedMembers = members.map((member) =>
            member.IDNO === updatedMember.IDNO ? updatedMember : member
        );
        setMembers(updatedMembers);

        // Fetch the specific ElderShip
        axios.get(`http://localhost:3001/ElderShip/${elderId}`)
            .then(response => {
                const elderShip = response.data;

                // Update the specific member within the ElderShip's nested structure
                elderShip.priests[priestIndex].families[familyIndex].members = updatedMembers;

                // Send PUT request to update the entire ElderShip
                return axios.put(`http://localhost:3001/ElderShip/${elderId}`, elderShip);
            })
            .then(response => {
                const updatedElderShip = response.data;
                console.log('Member updated successfully:', updatedMembers);

                // Update the global state
                updateElderShip(updatedElderShip);

                // Close the modal
                handleModalClose();
            })
            .catch(error => {
                console.error('Error updating member:', error);
            });
    };

    if (!family) {
        return <Container><Typography variant="h6">No family data available...</Typography></Container>;
    }

    return (
        <div>
            <Typography variant="h4">{family.name} Family</Typography>
            <Typography variant="body1">Address: {family.MemAddress}</Typography>
            {members.map((person, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <Typography>{person.Name1} {person.Name2} {person.Surname}</Typography>
                    <Typography variant="body2">CenGroup: {person.CenGroup}</Typography>
                    <Typography variant="body2">Age: {person.Age}</Typography>
                    <Button onClick={() => handleModalOpen(person)}>Edit Details</Button>
                </div>
            ))}
            
            <EditMemberDetailsModal
                open={isModalOpen}
                onClose={handleModalClose}
                memberData={selectedMember}
                onSave={handleSave}
            />
        </div>
    );
};

export default FamilyVisitingPoints;
