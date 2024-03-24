import React, { useState, useEffect } from "react";
import { getProductsWithPagination } from '../services/ProductService';
import { Link } from "react-router-dom";
 
const ProductPages = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
 
    const limit = 20;
 
    useEffect(() => {
        getProductsWithPagination(limit, ((currentPage - 1) * limit))
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
                setTotalPages(Math.ceil(response.data.total / limit));
            })
            .catch((error) => { console.log(error); });
    }, [currentPage, filterCategory]);
 
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
        return formattedProductTitle.includes(formattedSearchQuery) && (filterCategory === '' || product.category === filterCategory);
    });
 
    const handleCategoryFilter = (category) => {
        setFilterCategory(category);
        setCurrentPage(1); // Reset current page when category filter changes
    };
 
    return (
        <>
           <h1 style={{color:'#E75480'}}>Explore Our Products......</h1>
 
            <div className="category-filter">
                <button style ={{color:'blue'}} onClick={() => handleCategoryFilter('')}>All products</button>&nbsp;&nbsp;
                <button onClick={() => handleCategoryFilter('electronics')}>Electronics</button>&nbsp;&nbsp;
                <button onClick={() => handleCategoryFilter("men's clothing")}>Men's Clothing</button>&nbsp;&nbsp;
                 <button onClick={() => handleCategoryFilter("women's clothing")}>Women's Clothing</button>&nbsp;&nbsp;
                 <button onClick={() => handleCategoryFilter('jewelery')}>Jewellery</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="search-bar"
                />
                <button style={{ backgroundColor: 'green' ,color : 'white'}} className="search-button">Search</button>
            </div>
            <br/>
            <br/>
 
            {filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filteredProducts.map((product) => (
                            <div className="col" key={product.id}>
                                <div className="card h-100" style={{ width: '18rem' }}>
                                    <img src={product.image} className="card-img-top" alt={product.title} />
                                    <div className="card-body">
                                        <h5  className="card text-white bg-info mb-3">{product.title}</h5>
                                        <h6 className="card-text">Rating: {product.rating.rate}</h6>
                                        <h6 className="card-text">Category: {product.category}</h6>
                                    </div>
                                    <div className="card-body">
                                        <Link to={`/productdetails/${product.id}`}>Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                   
                </div>
            )}
        </>
    );
};
 
export default ProductPages;
 
// import React, { useState, useEffect } from "react";
// import { getProductsWithPagination } from '../services/ProductService';
// import { Link } from "react-router-dom";
 
// const ProductPages = () => {
//     const [products, setProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filterCategory, setFilterCategory]=useState('');
//     const limit = 20;
 
//     useEffect(() => {
//         getProductsWithPagination(limit, ((currentPage - 1) * limit))
//             .then((response) => {
//                 console.log(response.data);
//                 setProducts(response.data);
//                 setTotalPages(Math.ceil(response.data.total / limit));
//             })
//             .catch((error) => { console.log(error); });
//     }, [currentPage]);
 
//     const handlePrevious = () => {
//         setCurrentPage(prevPage => prevPage - 1);
//     };
 
//     const handleNext = () => {
//         setCurrentPage(prevPage => prevPage + 1);
//     };
 
//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         for (let i = 1; i <= totalPages; i++) {
//             pageNumbers.push(
//                 <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? 'active' : ''}>
//                     {i}
//                 </button>
//             );
//         }
//         return pageNumbers;
//     };
 
   
//     const filteredProducts = products.filter(product => {
//         const formattedSearchQuery = searchQuery.toLowerCase().replace(/\s/g, '');
//         const formattedProductTitle = product.title.toLowerCase().replace(/\s/g, '');
//         return formattedProductTitle.includes(formattedSearchQuery) && (filterCategory === '' || product.category === filterCategory);
//     });
 
//     const handleCategoryFilter = (category) => {
//         setFilterCategory(category);
//         setCurrentPage(1); // Reset current page when category filter changes
//     };
 
//     return (
//         <>
//           <div className="category-filter">
//                 <button onClick={() => handleCategoryFilter('')}>All products</button>
//                 <button onClick={() => handleCategoryFilter('electronics')}>Electronics</button>
//                 <button onClick={() => handleCategoryFilter("men's clothing")}>Men's Clothing</button>
//                  <button onClick={() => handleCategoryFilter("women's clothing")}>Women's Clothing</button>
//                  <button onClick={() => handleCategoryFilter('jewelery')}>Jewelry</button>
//             </div>
//             <style>
//                 {`
//                 .search-bar-container {
//                     display: flex;
//                     align-items: center;
//                     justify-content: flex-end;
//                     margin-bottom: 20px; /* Adjust spacing as needed */
//                 }
               
//                 .search-bar {
//                     width: 300px; /* Adjust width as needed */
//                     padding: 8px;
//                     border: 1px solid #ccc;
//                     border-radius: 5px;
//                     margin-right: 10px; /* Adjust spacing between input and button */
//                 }
               
//                 .search-button {
//                     padding: 8px 12px;
//                     border: none;
//                     background-color: #007bff; /* Example button color */
//                     color: #fff;
//                     border-radius: 5px;
//                     cursor: pointer;
//                 }
               
//                 .search-button:hover {
//                     background-color: #0056b3; /* Example hover color */
//                 }
//                 `}
//             </style>
//             <h1 style={{color: '#e75480'}}>Explore Our Products....</h1>
           
//             <div className="search-bar-container">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search products..."
//                     className="search-bar"
//                 />
//                 <button className="search-button">Search</button>
//             </div>
         
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//                 {filteredProducts.map((product) => (
//                     <div className="col" key={product.id}>
//                         <div className="card h-100" style={{ width: '18rem' }}>
//                             <img src={product.image} className="card-img-top" alt={product.title} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{product.title}</h5>
//                                 <h6 className="card-text">Rating :{product.rating.rate}</h6>
//                                 <h6 className="card-text">Category:{product.category}</h6>
//                             </div>
//                             <div className="card-body">
//                                 <Link to={`/productdetails/${product.id}`}>Details</Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
           
//         </>
//     );
// };
 
// export default ProductPages;