import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useElderShip } from '../../contexts/ElderShipContext';
import FilterBySelectionModal from '../../components/Modals/FilterBySelectionModal';

const ITEMS_PER_PAGE = 20;

const Search = () => {
    const { elderShips, updateElderShip } = useElderShip();
    const [members, setMembers] = useState([]);
    const [displayedMembers, setDisplayedMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/ElderShip');
                const allMembers = response.data.flatMap(elder =>
                    elder.priests.flatMap(priest =>
                        priest.families.flatMap(family => family.members)
                    )
                );
                setMembers(allMembers);
                setFilteredMembers(allMembers);
                setDisplayedMembers(allMembers.slice(0, ITEMS_PER_PAGE));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const results = members.filter(member =>
            member.Name1.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.Surname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMembers(results);
        setDisplayedMembers(results.slice(0, currentPage * ITEMS_PER_PAGE));
    }, [searchTerm, members, currentPage]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectMember = (member) => {
        setSelectedMembers(prevSelected => {
            const isSelected = prevSelected.some(selected => selected.IDNO === member.IDNO);
            if (isSelected) {
                return prevSelected.filter(selected => selected.IDNO !== member.IDNO);
            } else {
                return [...prevSelected, member];
            }
        });
    };

    const handleCheckboxChange = (event, member) => {
        event.stopPropagation(); // Prevent ListItem onClick event from firing
        handleSelectMember(member);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = async (updatedMembers) => {
        const newMembers = members.map(member => {
            const updatedMember = updatedMembers.find(m => m.IDNO === member.IDNO);
            return updatedMember ? updatedMember : member;
        });
        setMembers(newMembers);
        setFilteredMembers(newMembers);
        setDisplayedMembers(newMembers.slice(0, currentPage * ITEMS_PER_PAGE));
        setIsModalOpen(false);

        // Update the server with the new data
        for (const updatedMember of updatedMembers) {
            const elder = elderShips.find(elder =>
                elder.priests.some(priest =>
                    priest.families.some(family =>
                        family.members.some(member => member.IDNO === updatedMember.IDNO)
                    )
                )
            );

            if (elder) {
                const priest = elder.priests.find(priest =>
                    priest.families.some(family =>
                        family.members.some(member => member.IDNO === updatedMember.IDNO)
                    )
                );

                const family = priest.families.find(family =>
                    family.members.some(member => member.IDNO === updatedMember.IDNO)
                );

                family.members = family.members.map(member =>
                    member.IDNO === updatedMember.IDNO ? updatedMember : member
                );

                await axios.put(`http://localhost:3001/ElderShip/${elder.id}`, elder);
                updateElderShip(elder);
            }
        }
    };

    const loadMoreItems = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Search</Typography>
            <TextField
                fullWidth
                label="Search for a member"
                value={searchTerm}
                onChange={handleSearchChange}
                margin="normal"
            />
            <List>
                {displayedMembers.map((member) => {
                    const isSelected = selectedMembers.some(selected => selected.IDNO === member.IDNO);
                    return (
                        <ListItem key={member.IDNO} button onClick={() => handleSelectMember(member)}>
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(event) => handleCheckboxChange(event, member)}
                            />
                            <ListItemText primary={`${member.Name1} ${member.Surname}`} />
                        </ListItem>
                    );
                })}
            </List>
            {displayedMembers.length < filteredMembers.length && (
                <Button onClick={loadMoreItems} variant="contained" color="primary">
                    Load More
                </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                disabled={selectedMembers.length === 0}
            >
                Edit Selected Members
            </Button>
            <FilterBySelectionModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                selectedItems={selectedMembers}
                updateUserData={handleSave}
            />
        </Container>
    );
};

export default Search;
