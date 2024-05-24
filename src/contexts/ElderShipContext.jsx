import React, { createContext, useContext, useState, useEffect } from 'react';

const ElderShipContext = createContext();

export const ElderShipProvider = ({ children }) => {
    const [elderShips, setElderShips] = useState(() => {
        const storedData = localStorage.getItem('elderShips');
        return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
        localStorage.setItem('elderShips', JSON.stringify(elderShips));
    }, [elderShips]);

    const updateElderShip = (updatedElderShip) => {
        setElderShips((prevElderShips) =>
            prevElderShips.map((elderShip) =>
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

export const useElderShip = () => {
    return useContext(ElderShipContext);
};
