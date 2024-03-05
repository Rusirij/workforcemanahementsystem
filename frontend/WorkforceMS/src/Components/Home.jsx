import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeDetails = ({ home }) => {
    return (
        <div className="home-details">
            <div className="home-image">
                <img
                    src={`http://localhost:3000/Images/` + home.image}
                    alt={home.name}
                    className="home-image"
                />
            </div>
            <div className="home-info">
                <label>Name:</label> {home.name}
                <br />
                <label>Email:</label> {home.email}
                <br />
                <label>Address:</label> {home.address}
                <br />
                <label>Salary:</label> {home.salary}
            </div>
        </div>
    );
};

const Home = () => {
    const [homeList, setHomeList] = useState([]);
    const [selectedHome, setSelectedHome] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/home")
            .then((result) => {
                if (result.data.Status) {
                    setHomeList(result.data.Result);
                    // Select the first home by default
                    if (result.data.Result.length > 0) {
                        setSelectedHome(result.data.Result[0]);
                    }
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:3000/auth/delete_home/" + id)
            .then((result) => {
                if (result.data.Status) {
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            });
    };

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Home List</h3>
            </div>
            <div className="d-flex">
                {selectedHome && <HomeDetails home={selectedHome} />}
                <div className="clockin-button">
                    <button className="btn btn-primary">Clock In Time</button>
                </div>
            </div>
            <div className="mt-3">
                <table className="table">
                    {/* ... (rest of your table code) */}
                </table>
            </div>
        </div>
    );
};

export default Home;
