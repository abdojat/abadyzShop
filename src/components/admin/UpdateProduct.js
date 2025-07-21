import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, updateProduct } from '../../actions/productActions';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { uploadImage } from '../../api/index';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, product } = useSelector(state => state.productDetails);
    const { loading: updateLoading, isUpdated } = useSelector(state => state.product);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if (isUpdated) {
            navigate('/admin/products');
        }
    }, [dispatch, id, product, isUpdated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        let uploadedImages = [...oldImages];
        for (let img of images) {
            const formData = new FormData();
            console.log(img);
            formData.set('image', img);
            const res = await uploadImage(formData);
            uploadedImages.push({
                public_id: res.data.public_id,
                url: res.data.imageUrl
            });
        }
        dispatch(updateProduct(id, { name, price, description, category, stock, images: uploadedImages }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages(files);
        setImagesPreview([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            }

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <MetaData title="Update Product - Admin" />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Update Product
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                label="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                select
                                SelectProps={{ native: true }}
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value=""></option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </TextField>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                label="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />

                            <Box sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="subtitle1">Current Images:</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {oldImages?.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img.url}
                                            alt="Product Preview"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                    ))}
                                </Box>

                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="product-images"
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="product-images">
                                    <Button variant="contained" component="span">
                                        Upload New Images
                                    </Button>
                                </label>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                    {imagesPreview.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt="Product Preview"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={loading || updateLoading}
                            >
                                {loading || updateLoading ? 'Updating...' : 'Update Product'}
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default UpdateProduct;