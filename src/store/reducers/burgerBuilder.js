import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
};

const INGREDIENT_PRICES = {
	lettuce: 0.25,
	cheese: .75,
	meat: 2.25,
	bacon: 1.00
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					lettuce: action.ingredients.lettuce,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				error: false
			};
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			};
	default:
		return state;
	}
};

export default reducer;