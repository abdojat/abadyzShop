// src/reducers/index.js
import { combineReducers } from 'redux';

import {
    productsReducer,
    newProductReducer,
    productReducer,
    productDetailsReducer
} from './productReducer';

import {
    allOrdersReducer,
    newOrderReducer,
    myOrdersReducer,
    orderReducer,
    orderDetailsReducer
} from './orderReducer';

import {
    allUsersReducer,
    userReducer,
    userDetailsReducer
} from './userReducer';

import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';

export default combineReducers({
    // Products
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,

    // Orders
    allOrders: allOrdersReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,

    // Users
    allUsers: allUsersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,

    // Auth & Cart
    auth: authReducer,
    cart: cartReducer
});
