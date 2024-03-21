import React, { useState, useEffect } from "react";
import { getProductsWithPagination } from '../services/ProductService';
import { Link } from "react-router-dom";
 
const ProductPages = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const limit = 20;
 
    useEffect(() => {
        getProductsWithPagination(limit, ((currentPage - 1) * limit))
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
                setTotalPages(Math.ceil(response.data.total / limit));
            })
            .catch((error) => { console.log(error); });
    }, [currentPage]);
 
    const handlePrevious = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };
 
    const handleNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
 
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? 'active' : ''}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };
 
    const filteredProducts = products.filter(product => {
        const formattedSearchQuery = searchQuery.toLowerCase().replace(/\s/g, '');
        const formattedProductTitle = product.title.toLowerCase().replace(/\s/g, '');
        return formattedProductTitle.includes(formattedSearchQuery);
    });
 
    return (
        <>
            <style>
                {`
                .search-bar-container {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-bottom: 20px; /* Adjust spacing as needed */
                }
               
                .search-bar {
                    width: 300px; /* Adjust width as needed */
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-right: 10px; /* Adjust spacing between input and button */
                }
               
                .search-button {
                    padding: 8px 12px;
                    border: none;
                    background-color: #007bff; /* Example button color */
                    color: #fff;
                    border-radius: 5px;
                    cursor: pointer;
                }
               
                .search-button:hover {
                    background-color: #0056b3; /* Example hover color */
                }
                `}
            </style>
            <h1>Product Pages</h1>
           
            <div className="search-bar-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="search-bar"
                />
                <button className="search-button">Search</button>
            </div>
         
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map((product) => (
                    <div className="col" key={product.id}>
                        <div className="card h-100" style={{ width: '18rem' }}>
                            <img src={product.image} className="card-img-top" alt={product.title} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <h6 className="card-text">Rating :{product.rating.rate}</h6>
                                <h6 className="card-text">Category:{product.category}</h6>
                            </div>
                            <div className="card-body">
                                <Link to={`/productdetails/${product.id}`}>Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                <span>{renderPageNumbers()}</span>
                <button className="btn btn-secondary" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    );
};
 
export default ProductPages;