import React from 'react'
import './Preloader.css'

const Preloader = () => {
    return (
    <div className="loading-overlay" id="loading">
        <div className="reverse-spinner"></div>
    </div>);
}

export default Preloader;