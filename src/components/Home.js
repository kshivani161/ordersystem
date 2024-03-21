import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <div style={{ minHeight: "100vh" }}>
                <div style={{ minHeight: "100vh" }} className="row">
                  <div>
                        <Link className="lead text-primary" style={{ textDecoration:'underline' }} to='/login'>Order Something...</Link>
                    </div>
                    <div>
                        <img width="100%" src="https://t4.ftcdn.net/jpg/02/02/76/03/360_F_202760374_cboPIdQBgVj2o3PVfmRKQshVwreli9SA.jpg" alt="ordering" />
                    </div>
                    
                </div>
            </div>
        </ >
    );
};
export default Home;




