import React from 'react';
import "./LoadingPage.css"

const LoadingSpinner = () => {
    return (
        <div class='container'>
            <div class='loader'>
                <div class='loader--dot'></div>
                <div class='loader--dot'></div>
                <div class='loader--dot'></div>
                <div class='loader--dot'></div>
                <div class='loader--dot'></div>
                <div class='loader--dot'></div>
                <div class='loader--text'></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;