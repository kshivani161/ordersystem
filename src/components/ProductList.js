// https://dummyjson.com/products?limit=10&skip=0

import { useState, useEffect } from "react";

import { getAllProducts } from '../services/ProductService';
import { Link } from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = useState('');

    useEffect(() => {

        getAllProducts()
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    return (
        <>
            <h1>Product List </h1>
            {products &&
                products.map((product) => {
                    return <div>
                        <Link to={`/productdetails/${product.id}`}>{product.title}</Link>
                    </div>
                })
            }
        </>
    );
};
export default ProductList;


