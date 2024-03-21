import axios from "axios";

const productUrl = 'https://fakestoreapi.com/products';



const getAllProducts = () => {
    console.log('getAllProducts');
   return axios.get(`${productUrl}?limit=0&select=id,title`);
    // return axios.get(`${productUrl}?select=id,title`);
};

const getProductsWithPagination = (limit, skip) => {
    console.log(limit, skip);
    return axios.get(`${productUrl}?limit=${limit}&skip=${skip}`);
};

const getProductById = (productId) => {
    console.log(productId);
    return axios.get(`${productUrl}/${productId}`);
};



export { getAllProducts, getProductsWithPagination, getProductById };


