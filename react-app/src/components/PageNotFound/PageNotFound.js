import React from 'react';
import './PageNotFound.css';


const PageNotFound = () => {

    return (
        <div className='pagenotfound__goat'>
            <h1 className='pagenotfound__text'>Oops! That page does not exist...</h1>
            <img className='pagenotfound__image' src='https://sangha.s3.us-east-2.amazonaws.com/404_goatyoga.png' alt='Goat Yoga' />
            <div>
                <h1 className='pagenotfound__text'>
                    Please click {" "}
                <a className='pagenotfound__text' href='/home' style={{ font: 'bold'}}>HERE</a>{" "}
                to go home.
                </h1>
            </div>
        </div>
    )
}

export default PageNotFound;