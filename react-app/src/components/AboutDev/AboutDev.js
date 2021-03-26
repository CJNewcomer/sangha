import React from 'react';
import './AboutDev.css';

const AboutDev = () => {
    return (
        <>
            <div className='image__row'>
                <div className='image_columns'>
                    <img className='image__three' src='https://sangha.s3.us-east-2.amazonaws.com/yogacourt3.jpg' alt='Courtney Yoga'/>
                </div>
                <div className='image_columns'>
                    <img className='image__two' src='https://sangha.s3.us-east-2.amazonaws.com/yogacourt2.jpg' alt='Courtney Yoga'/>
                    <img className='image__four' src='https://sangha.s3.us-east-2.amazonaws.com/mindfulness.jpg' alt='Courtney Yoga'/>
                    <img className='image__one' src='https://sangha.s3.us-east-2.amazonaws.com/yogacourt1.jpg' alt='Courtney Yoga' />
                </div>
                <div className='image_columns'>
                    <img className='image__six' src='https://sangha.s3.us-east-2.amazonaws.com/yogacourt6.jpg' alt='Courtney Yoga' />
                    <img className='image__eight' src='https://sangha.s3.us-east-2.amazonaws.com/yogacourt8.jpg' alt='Courtney Yoga'/>
                </div>
                <div className='image_columns'>
                    <img className='image__five' src='https://sangha.s3.us-east-2.amazonaws.com/yogacourt5.jpg' alt='Courtney Yoga'/>
                </div>
                <div className='about__contact'>
                    <h3>Created by Courtney Newcomer &copy; 2021</h3>
                    <div className='links__container'>
                        <a className='contact__links' href='https://github.com/CJNewcomer'>
                            <i class="fa fa-github"></i>
                        </a>
                        <a className='contact__links' href='https://www.linkedin.com/in/courtney-newcomer-gray-474b0923/'>
                            <i class="fa fa-linkedin"></i>
                        </a>
                        <a className='contact__links' href='https://angel.co/u/courtney-newcomer'>
                            <i class="fa fa-angellist"></i>
                        </a>
                        <a className='contact__links' href=''>
                            <i class="fa fa-globe"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutDev;