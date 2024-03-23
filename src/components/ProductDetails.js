import { useEffect, useState } from "react";
import { getProductById } from "../services/ProductService";
import { useParams } from "react-router-dom";
 
const ProductDetails = () => {
    const productParam = useParams();
 
    const [product, setProduct] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
 
    useEffect(() => {
        getProductById(productParam.productId)
            .then((response) => {
                setProduct(response.data);
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
                setProduct('');
            });
    }, [productParam.productId]);
 
    // const handleAddToCart = () => {
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     cartItems.push(product);
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //     alert("Product added to cart!");
    // };
    const handleAddToCart = () => { 
        const productCopy = { ...product };
        productCopy.quantity = 1;
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(productCopy);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert("Product added to cart!");
    };

    return (
<>
<p className="mt-3 display-5 text-primary">Product Details</p>
            {product &&
<div className="border border-secondary shadow rounded px-2 py-2" >
<h2>{product.title}</h2>
<p>{product.description}</p>
<p>MRP ₹{product.price}/-</p>
<img width={'25%'} src={product.image} alt="product image" />
</div>
            }
            {errorMessage &&
<p>{errorMessage}</p>
            }
            {product &&
<div className="mt-3">
<button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
</div>
            }
</>
    );
}
 
export default ProductDetails;