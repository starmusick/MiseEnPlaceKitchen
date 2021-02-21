import { v1 as uuid } from 'uuid';
import {
	GET_ITEMS,
	ADD_ITEM,
	DELETE_ITEM,
	ITEMS_LOADING,
	EDIT_ITEM,
} from '../actions/types';

const initialState = {
	items: [],
	loading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				items: action.payload,
				loading: false,
			};
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(
					item => item._id !== action.payload
				),
			};
		case ADD_ITEM:
		case EDIT_ITEM:
			const previousItems = [...state.items];
			const itemIndex = previousItems.findIndex(
				item => item._id === action.payload.id
			);
			previousItems[itemIndex] = action.payload;
			return {
				...state,
				items: previousItems,
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
