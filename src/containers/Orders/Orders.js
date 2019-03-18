import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

	componentDidMount () {
		this.props.onFetchOrders();
	};

	render () {
		let orders = <Spinner />;
		if ( !this.props.loading ) {
			console.log(this.props);
			orders = this.props.orders.map( order => (
				<Order
					key={ order.id }
					ingredients={ order.ingredients }
					price={ order.price } />
			));
			// console.log(orders);
			
		};
		return (
			<div>
				{ orders }
			</div>
		);
	};
};

const mapStateToProps = state => {
	console.log(state.order);
	
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		price: state.order.price
	};	
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));