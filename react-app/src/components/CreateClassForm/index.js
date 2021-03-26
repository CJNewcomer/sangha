import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAClass } from '../../store/class';
import './CreateClassForm.css';


const CreateClassForm = ({ updateOneClass }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        if (!!updateOneClass) {
            setName(updateOneClass.name);
            setType(updateOneClass.type);
            setImage(updateOneClass.image);
            setDate(updateOneClass.date);
            setTime(updateOneClass.time);
            setLocation(updateOneClass.location);
            setDescription(updateOneClass.description);
            setPrice(updateOneClass.price);
            setCity(updateOneClass.city);
            setState(updateOneClass.state);
            setCountry(updateOneClass.country);
        }
    }, [updateOneClass]);
    
    const createClass = async (e) => {
        e.preventDefault();
        setErrors([]);
        let newErrors = [];

        const oneClass = {
            user_id: sessionUser.id,
            name: name,
            type,
            image,
            date,
            time,
            location,
            description,
            price,
            city,
            state,
            country
        };

        const classErrors = await dispatch(
            !!updateOneClass 
            ? createAClass(oneClass,updateOneClass.id) 
            : createAClass(oneClass)
            );
        if (classErrors.errors) {
            newErrors = classErrors.errors;
            setErrors(newErrors);
        } else {
            history.push(`/classes/${classErrors.id}`);
        }
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const isDisabledInput = () => {
        if (location === 'Virtual') {
            return true;
        }
    }


    return (
        <div className='class__container'>
            <h1 className='form__title'>{!!updateOneClass ? 'Update Class' : 'Create Class'}</h1>
            <form onSubmit={createClass} className='class__form'>
                <div className='row'>
                    <div className='col-25'>
                        <label>Class Name</label>
                    </div>
                    <div className='col-75'>
                        <input 
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='class__form-input'
                            />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-25'>
                        <label>Class Type</label>
                    </div>
                    <div className='col-75'>
                        <select
                            name='type'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            className='class__form-input'
                            >
                            <option value='' disabled>
                                -Select One-
                            </option>
                            <option value='Ashtanga'>Ashtanga</option>
                            <option value='Hatha'>Hatha</option>
                            <option value='Meditation'>Meditation</option>
                            <option value='Prenatal'>Prenatal</option>
                            <option value='Restorative'>Restorative</option>
                            <option value='Vinyasa'>Vinyasa</option>
                            <option value='Yin'>Yin</option>
                            <option value='Yoga Nidra'>Yoga Nidra</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-25'>
                        <label>Image</label>
                    </div>
                    <div className='col-75'>
                        <input className='image__upload' type='file' onChange={updateFile}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-25'>
                        <label>Date</label>
                    </div>
                    <div className='col-75'>
                        <input 
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className='class__form-input'
                            />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-25'>
                        <label>Time</label>
                    </div>
                    <div className='col-75'>
                        <input 
                            type='time'
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className='class__form-input'
                            />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-25'>
                        <label>Location</label>
                    </div>
                    <div className='col-75'>
                        <select
                            name='location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className='class__form-input'
                            >
                            <option value='' disabled>
                                -Select One-
                            </option>
                            <option value='In-Person'>In-Person</option>
                            <option value='Virtual'>Virtual</option>
                            <option value='In-Person / Virtual'>In-Person / Virtual</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-25'>
                        <label>Price</label>
                    </div>
                    <div className='col-75'>
                        <input
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className='class__form-input'
                            />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-25'>
                        <label>Class Description</label>
                    </div>
                    <div className='col-75'>
                        <textarea
                            name='description'
                            required={true}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder='What to expect?'
                            cols={35}
                            rows={4}
                            className='class__form-input'
                            ></textarea>
                    </div>
                </div>
                 <div className='row'>
                    <div className='col-25'>
                        <label>City</label>
                    </div>
                    <div className='col-75'>
                        <input 
                            disabled={isDisabledInput}
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className='class__form-input'
                            />
                    </div>
                </div>
                 <div className='row'>
                    <div className='col-25'>
                        <label>State</label>
                    </div>
                    <div className='col-75'>
                        <input 
                            disabled={isDisabledInput}
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            className='class__form-input'
                            />
                    </div>
                </div>
                 <div className='row'>
                    <div className='col-25'>
                        <label>Country</label>
                    </div>
                    <div className='col-75'>
                        <input 
                            disabled={isDisabledInput}
                            type='text'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            className='class__form-input'
                            />
                    </div>
                </div>
                <div className='row'>
                    <button type='submit'>Create Class</button>
                </div>
                <div className='row' id='errors'>
                    {errors.map((error) => (
                        <div key={error}>{error}</div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default CreateClassForm;