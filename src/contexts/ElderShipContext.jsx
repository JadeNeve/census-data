import React, { createContext, useContext, useState } from 'react';

const ElderShipContext = createContext();

export const useElderShip = () => useContext(ElderShipContext);

export const ElderShipProvider = ({ children }) => {
    const [elderShips, setElderShips] = useState([]);

    const updateElderShip = (updatedElderShip) => {
        setElderShips(prevElderShips =>
            prevElderShips.map(elderShip =>
                elderShip.id === updatedElderShip.id ? updatedElderShip : elderShip
            )
        );
    };

    return (
        <ElderShipContext.Provider value={{ elderShips, setElderShips, updateElderShip }}>
            {children}
        </ElderShipContext.Provider>
    );
};
