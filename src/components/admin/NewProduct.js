import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../actions/productActions';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { uploadImage } from '../../api/index';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.newProduct);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let uploadedImages = [];
            for (let img of images) {
                const formData = new FormData();
                formData.set('image', img);
                const res = await uploadImage(formData);
                uploadedImages.push({
                    public_id: res.data.public_id,
                    url: res.data.imageUrl
                });
            }
            const productData = {
                name,
                price,
                description,
                category,
                stock,
                images: uploadedImages,
            };
            dispatch(createProduct(productData));
            navigate('/admin/products');
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
            <MetaData title="New Product - Admin" />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            New Product
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
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="product-images"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="product-images">
                                    <Button variant="contained" component="span">
                                        Upload Images
                                    </Button>
                                </label>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                                    {imagesPreview.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt="Product Preview"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Product'}
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default NewProduct;