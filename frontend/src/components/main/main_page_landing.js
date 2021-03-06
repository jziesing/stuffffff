import React from "react";
import { Link } from 'react-router-dom'
import "./main_page.css";
import Unicorn from './unicorn.jpg';
import Portfolio from './portfolio.jpg';

class MainPageLanding extends React.Component {
  render() {
    return (
        <div>
            <p className="main-welcome-message">Welcome to NiteTrader</p>
            <div className="main-components">
                <Link to="/portfolio" className="baby-button1">
                    <span><img src={Portfolio} alt='portfolio' className="baby-button-img1"/></span>
                    <span className="baby-button-text1">Build Your Portfolio</span> 
                </Link>
                <Link to="/search" className="baby-button2">
                    <span><img src={Unicorn} alt='unicorn' className="baby-button-img2"/></span>
                    <span className="baby-button-text2">Find The Next Unicorn</span> 
                </Link>
            </div>
        </div>
    );
    }
}

export default MainPageLanding;
