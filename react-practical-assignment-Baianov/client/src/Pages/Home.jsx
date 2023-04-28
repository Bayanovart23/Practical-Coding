import React from 'react';
import Header from "../Components/Header/index";
import Posts from "../Components/Posts";
import Footer from "../Components/Footer";

const Home = () => {

    return (
        <div className='homeWrapper'>
            <Header/>
            <Posts/>
            <Footer/>
        </div>
    );
};

export default Home;