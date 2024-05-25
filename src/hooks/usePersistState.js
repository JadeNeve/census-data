import { useState, useEffect, useMemo } from 'react';

export default function usePersistState(initialValue, id) {
    // Set initial value
    const _initialValue = useMemo(() => {
        const localStorageValueStr = localStorage.getItem('state:' + id);
        // If there is a value stored in localStorage, use that
        if (localStorageValueStr) {
            return JSON.parse(localStorageValueStr);
        }
        // Otherwise use initial_value that was passed to the function
        return initialValue;
    }, [id, initialValue]);

    const [state, setState] = useState(_initialValue);

    // Store state in local storage whenever it changes
    useEffect(() => {
        const stateStr = JSON.stringify(state); // Stringified state
        localStorage.setItem('state:' + id, stateStr); // Set stringified state as item in localStorage
    }, [state, id]);

    return [state, setState];
}
