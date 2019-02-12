import React from 'react';

import classes from './NavigationItem/NavigationItem.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
	<ul className={ classes.NavigationItems }>
		<NavigationItem link="/" active>BurgerBuilder</NavigationItem>
		<NavigationItem link="/" active>Checkout</NavigationItem>
	</ul>
);

export default navigationItems;