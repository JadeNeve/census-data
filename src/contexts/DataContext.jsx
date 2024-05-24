import React, { createContext, useContext, useState, useEffect } from 'react';
import transformData from '../utils/transformData';
import jsonData from '../data/census.json';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const transformedData = transformData(jsonData);
        setPlaces(transformedData);
        console.log("Initial Transformed Data:", transformedData);
    }, []);

    const updateMemberDetails = (editedData) => {
        setPlaces(prevPlaces => {
            return prevPlaces.map(place => {
                // Check if this is the right congregation based on your identifier (e.g., OverseerShip)
                if (place.congregation.OverseerShip !== editedData.OverseerShip) {
                    return place;
                }

                const updatedElderShips = Object.keys(place.congregation.ElderShip).map(elderKey => {
                    const elder = place.congregation.ElderShip[elderKey];

                    const updatedPriests = elder.priests.map(priest => {
                        if (priest.prstAdminSortName !== editedData.prstAdminSortName) {
                            return priest;
                        }

                        const updatedFamilies = Object.keys(priest.families).map(familyKey => {
                            const family = priest.families[familyKey];
                            if (familyKey !== editedData.Surname) {
                                return family;
                            }

                            const updatedMembers = family.members.map(member => {
                                if (member.IDNO === editedData.IDNO) {
                                    console.log("Updating Member:", member);
                                    return { ...member, ...editedData };
                                }
                                return member;
                            });

                            return { ...family, members: updatedMembers };
                        });

                        return { ...priest, families: updatedFamilies.reduce((acc, fam) => ({ ...acc, [fam.Surname]: fam }), {}) };
                    });

                    return { ...elder, priests: updatedPriests };
                });

                return {
                    ...place,
                    congregation: {
                        ...place.congregation,
                        ElderShip: updatedElderShips.reduce((acc, elder) => ({ ...acc, [elder.ElderShip]: elder }), {})
                    }
                };
            });
        });
    };

    return (
        <DataContext.Provider value={{ places, updateMemberDetails }}>
            {children}
        </DataContext.Provider>
    );
};
