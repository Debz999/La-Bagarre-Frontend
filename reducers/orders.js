import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addOrder: (state, action) => {
			console.log(action.payload)
			state.value.push(action.payload);
		},
		
	},
});

export const { addOrder} = ordersSlice.actions;
export default ordersSlice.reducer;