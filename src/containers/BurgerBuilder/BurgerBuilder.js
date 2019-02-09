import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE = {
	lettuce: 0.25,
	cheese: .75,
	meat: 2.25,
	bacon: 1.00
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			lettuce: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
				...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
	};

	removeIngredientHandler = (type) => {

	};

	render() {
		return (
			<Aux>
				<Burger ingredients={ this.state.ingredients } />
				<BuildControls
					ingredientAdded={ this.addIngredientHandler } />
			</Aux>
		);
	};
};

export default BurgerBuilder;