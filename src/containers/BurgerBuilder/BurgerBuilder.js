import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';

const INGREDIENT_PRICE = {
	lettuce: 0.25,
	cheese: .75,
	meat: 2.25,
	bacon: 1.00
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios.get('https://react-burger-builder-2-4a827.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data });
			})
			.catch(error => {
				this.setState({ error: true });
			});
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			} , 0);
		this.setState({purchaseable: sum > 0});
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
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <=0) {
			return;
		};
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () =>  {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// console.log('Continue');	
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Ben Leahy',
				address: {
					street: '123 Benmerica Industries Way',
					zipCode: '12345',
					country: 'United States'
				},
				email: 'ben@benmericaindustries.com'
			},
			deliveryMethod: 'fastest'
		};
		axios.post('/orders.json', order)
			.then(response => {				
				this.setState({ loading: false, purchasing: false });
			})
			.catch(error => {
				this.setState({ loading: false, purchasing: false });
			})
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <=0;
		};

		let orderSummary = null;

		if (this.state.loading) {
			orderSummary = <Spinner />
		};

		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

		if (this.state.ingredients) {
			burger = (
			<Aux>
				<Burger ingredients={ this.state.ingredients } />
				<BuildControls
				ingredientAdded={ this.addIngredientHandler }
				ingredientRemoved={ this.removeIngredientHandler }
				disabled={ disabledInfo }
				purchaseable= { this.state.purchaseable }
				ordered= { this.purchaseHandler }
				price= { this.state.totalPrice } />
			</Aux>
			)
			orderSummary = <OrderSummary
				ingredients= { this.state.ingredients } 
				price={ this.state.totalPrice }
				purchaseCancelled={ this.purchaseCancelHandler }
				purchaseContinued={ this.purchaseContinueHandler } />;
		};

		if (this.state.loading) {
			orderSummary = <Spinner />;
		};

		return (
			<Aux>
				<Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler } >
					{ orderSummary }
				</Modal>
				{burger}
			</Aux>
		);
	};
};

export default withErrorHandler(BurgerBuilder, axios);