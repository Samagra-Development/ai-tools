import { useCallback, useState } from 'react';

export const useLocalStorage = (
	key: string,
	initialState: string | null,
	parseToJson = false
): [any, any] => {
	const [value, setValue] = useState(
		// @ts-ignore
		parseToJson ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key) ?? initialState
	);
	const updatedSetValue = useCallback(
		(newValue: string) => {
			if (newValue === initialState || typeof newValue === 'undefined') {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, newValue);
			}
			setValue(newValue ?? initialState);
		},
		[initialState, key]
	);
	return [value, updatedSetValue];
};