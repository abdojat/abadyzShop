import { Button, TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../actions/productActions";

const ProductRow = ({ product }) => {
    const dispatch = useDispatch();
    const handeDelete = () => {
        dispatch(deleteProduct(product._id));
    }

    return (
        <TableRow key={product._id}>
            <TableCell>{product._id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
                <Button
                    component={Link}
                    to={`/admin/product/${product._id}`}
                    startIcon={<EditIcon />}
                />
                <Button
                    color="error"
                    onClick={handeDelete}
                    startIcon={<DeleteIcon />}
                />
            </TableCell>
        </TableRow>
    );
};

export default ProductRow;