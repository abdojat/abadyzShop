import axios from 'axios';

const API = axios.create({ baseURL: 'https://abadyzshopapi.onrender.com/api/v1' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const login = formData => API.post('/login', formData);
export const register = formData => API.post('/register', formData);
export const loadUser = () => API.get('/me');
export const logout = () => API.get('/logout');
export const updateProfile = userData => API.put('/me/update', userData);
export const updatePassword = passwords => API.put('/password/update', passwords);
export const forgotPassword = email => API.post('/password/forgot', email);
export const resetPassword = (token, passwords) => API.put(`/password/reset/${token}`, passwords);

// Products
export const getProducts = (keyword = '', currentPage = 1, price = [0, 1000], category, ratings = 0) =>
    API.get(`/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}${category ? `&category=${category}` : ''}`);

export const getProductDetails = id => API.get(`/product/${id}`);
export const createReview = (reviewData) => API.put('/review', reviewData);

// Admin
export const getAllUsers = () => API.get('/admin/users');
export const getUserDetails = id => API.get(`/admin/user/${id}`);
export const updateUser = (id, userData) => API.put(`/admin/user/${id}`, userData);
export const deleteUser = id => API.delete(`/admin/user/${id}`);
export const newProduct = (data) => API.post('/admin/product/new', data);
export const deleteProduct = (id) => API.delete(`/admin/product/${id}`);
export const updateProduct = (id, data) => API.put(`/admin/product/${id}`, data);


// Cart
export const addToCart = (id, quantity) => API.post(`/order/new`, { product: id, quantity });
export const getCartItems = () => API.get('/orders/me');
export const removeFromCart = id => API.delete(`/order/${id}`);

// Orders
export const createOrder = orderData => API.post('/order/new', orderData);
export const getOrderDetails = id => API.get(`/order/${id}`);
export const myOrders = () => API.get('/orders/me');
export const getAllOrders = () => API.get('/admin/orders');
export const updateOrder = (id, orderData) => API.put(`/admin/order/${id}`, orderData);
export const deleteOrder = id => API.delete(`/admin/order/${id}`);



// payment
export const payWithStripe = amount => API.post('/payment/stripe', { amount });


// upload
export const uploadImage = formData => API.post('/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
});