import { useState, useEffect } from "react";
import { getProductsWithPagination } from '../services/ProductService';
import { Link } from "react-router-dom";

const ProductPages = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

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



// import { useState, useEffect } from "react";

// import { getProductsWithPagination } from '../services/ProductService';
// import { Link } from "react-router-dom";

// const ProductPages = () => {

//     const [products, setProducts] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [limit, setLimit] = useState(10); // can be changed dynamically
//     const [skip, setSkip] = useState(0);

//     useEffect(() => {

//         getProductsWithPagination(limit, skip)
//             .then((response) => {
//                 console.log(response.data);
//                 setProducts(response.data.products);
//                 setTotalPages(Math.floor(response.data.total / response.data.limit));
//             })
//             .catch((error) => {
//                 console.log(error);
//             });

//     }, [skip, currentPage, totalPages]);

//     const handlePrevious = () => {
//         console.log('handlePrevious');
//         if (skip > 0) {
//             setSkip(skip - 10);
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNext = () => {
//         console.log('handleNext');
//         if (skip < totalPages * currentPage) {
//             setSkip(skip + 10);
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPageNumbers = 5;
//         const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
//         const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(
//                 <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? 'active' : ''}>
//                     {i}
//                 </button>
//             );
//         }
//         return pageNumbers;
//     };


//     // Note: use cards layout
//     // https://getbootstrap.com/docs/5.3/components/card/#card-layout

//     return (
//         <>
//             <h1>Product Pages </h1>
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//                 {products &&
//                     products.map((product) => {
//                         return <div className="col" key={product.id}>
//                             <div className="card h-100" style={{ width: '18rem' }}>
//                                 <img src={product.thumbnail} className="card-img-top" alt={product.title} />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{product.title}</h5>
//                                     <p className="card-text">{product.description}</p>
//                                 </div>
//                                 <div className="card-body">
//                                     <Link to={`/product-details/${product.id}`}>{product.title}</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     })
//                 }
//             </div>
//             <div>
//                 <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
//                 <span>{renderPageNumbers()} </span>
//                 <button className="btn btn-secondary" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
//             </div>

//             <div>
//                 <nav>
//                     <ul className="pagination justify-content-center">
//                         <li className="page-item">
//                             <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
//                         </li>
//                         <li className="page-item"><a className="page-link" href="#">1</a></li>
//                         <span>{renderPageNumbers()} </span>
//                         <li className="page-item">
//                             <button className="btn btn-secondary" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </>
//     );
// };
// export default ProductPages;
