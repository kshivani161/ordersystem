import { useState, useEffect } from "react";
import { getProductsWithPagination } from '../services/ProductService';
import { Link } from "react-router-dom";

const ProductPages = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
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

    return (
        <>
            <h1>Product Pages</h1>
            
         
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                        <div className="card h-100" style={{ width: '18rem' }}>
                            <img src={product.image} className="card-img-top" alt={product.title} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>
                            <div className="card-body">
                                <Link to={`/productdetails/${product.id}`}>{product.title}</Link>
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

