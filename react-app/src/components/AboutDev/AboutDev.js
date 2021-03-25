import React from 'react';

const AboutDev = () => {
    return (
        <>
            <div className='about__container'>
                <div className='image__container'>   
                    <img className='image__one' src='https://sangha.s3.us-east-2.amazonaws.com/court1.PNG' alt='Courtney Yoga' />
                </div>
                <div>
                    <img className='image__two' src='https://sangha.s3.us-east-2.amazonaws.com/court2.PNG' alt='Courtney Yoga'/>
                </div>
                <div>
                    <img className='image__three' src='https://sangha.s3.us-east-2.amazonaws.com/court3.PNG' alt='Courtney Yoga'/>
                </div>
                <div>
                    <img className='image__four' src='https://sangha.s3.us-east-2.amazonaws.com/court4.PNG' alt='Courtney Yoga'/>
                </div>
                <div>
                    <img className='image__five' src='https://sangha.s3.us-east-2.amazonaws.com/court5.PNG' alt='Courtney Yoga'/>
                </div>
                    <div>
                        <h5>Created by Courtney Newcomer &copy; 2021</h5>
                    </div>
                    <div className='links__container'>
                        <a className='contact__links' href='https://github.com/CJNewcomer'>
                            <i class="fas fa-github"></i>
                        </a>
                        <a className='contact__links' href='https://www.linkedin.com/in/courtney-newcomer-gray-474b0923/'>
                            <i class="fas fa-linkedin"></i>
                        </a>
                        <a className='contact__links' href='https://angel.co/u/courtney-newcomer'>
                            <i class="fas fa-angellist"></i>
                        </a>
                        <a className='contact__links' href=''>
                            <i class="fas fa-globe"></i>
                        </a>
                    </div>
            </div>
        </>
    )
}

export default AboutDev;