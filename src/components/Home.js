import { Link } from "react-router-dom";
import {auth,firestore} from "../firebase/firebase";
 
const Home = () => {
   
 
    return (
        <>
            <div style={{ minHeight: "100vh" }}>
                <div style={{ minHeight: "100vh" }} className="row">
                <div className="col">
                        <Link to="/productpage"  style={{ textDecoration:'underline' }} className="display-2 text-primary link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Start shopping...</Link>
                    </div>
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
 
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="
https://tse4.mm.bing.net/th/id/OIP.9ULXa5BVldSwXLFLUFP2LAHaEK?w=295&h=180&c=7&r=0&o=5&dpr=1.5&pid=1." class="border-bottom-0"  height="600px" width="100%" alt="image1"/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>First slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </div>
                            </div>
                            <div class="carousel-item">
                                <img src="https://www.omjewellers.com.au/wp-content/uploads/2022/03/jewellery-accessories.jpg"  class="border-bottom-0" height="600px" width="100%" alt="image2"/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Second slide label</h5>
                                        <p>Some representative placeholder content for the second slide.</p>
                                    </div>
                            </div>
                            <div class="carousel-item">
                                <img src="
https://tse2.mm.bing.net/th/id/OIP.IRdX1EO0AyffSrjdC3gQ5QHaFI?w=202&h=140&c=7&r=0&o=5&dpr=1.5&pid=1.7" class="border-bottom-0" height="600px" width="100%" alt="image3"/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Third slide label</h5>
                                        <p>Some representative placeholder content for the third slide.</p>
                                    </div>
                            </div>
                            <div class="carousel-item">
                                <img src="https://tse1.mm.bing.net/th/id/OIP.Kxexs_egU6_vTV4NJf9o7wHaFk?w=202&h=152&c=7&r=0&o=5&dpr=1.5&pid=1.7" class="border-bottom-0" height="600px" width="100%" alt="image4"/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Third slide label</h5>
                                        <p>Some representative placeholder content for the third slide.</p>
                                    </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                   
                </div>
            </div>
        </ >
    );
};
export default Home;