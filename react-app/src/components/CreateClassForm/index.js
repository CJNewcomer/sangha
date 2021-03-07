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
    // const [locationId, setLocationId = useState('');
    // const [userId, setUserId = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        if (!!updateOneClass) {
            setName(updateOneClass.name);
            setType(updateOneClass.type);
            setImage(updateOneClass.image);
            setDate(updateOneClass.date);
            setTime(updateOneClass.time);
            setDescription(updateOneClass.description);
            setPrice(updateOneClass.price);
        }
    }, [updateOneClass]);
    
    const createClass = async (e) => {
        e.preventDefault();
        setErrors([]);
        let newErrors = [];

        const oneClass = {
            userId: sessionUser.id,
            locationId,
            name: name,
            type,
            image,
            date,
            time,
            description,
            price,
        };

        const classErrors = await dispatch(
            !!updateOneClass ? createAClass(oneClass,updateOneClass.id) 
            : createAClass(updateOneClass)
            );
        if (classErrors.errors) {
            newErrors = classErrors.errors;
            setErrors(newErrors);
        } else {
            history.push(`/classes${classErrors.id}`);
        }
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    return (
        <div>
            <h1>{!!updateOneClass ? 'Update Class' : 'Add Class'}</h1>
            <form onSubmit={createClass} class='class__form'>
                <div>
                    <label>Class Name</label>
                    <input 
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='class__form-input'
                        />
                </div>
                <div>
                    <label>Class Type</label>
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
                <div>
                    <label>Image
                        <input className='image__upload' type='file' onChange={updateFile}/>
                    </label>
                </div>
                <div>
                    <label>Date</label>
                    <input 
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className='class__form-input'
                        />
                </div>
                <div>
                    <label>Time</label>
                    <input 
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className='class__form-input'
                        />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className='class__form-input'
                        />
                </div>
                <div>
                    <label>Class Description</label>
                </div>
                <textarea
                    name='description'
                    required={true}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='(What to expect?)'
                    cols={35}
                    rows={4}
                    className='class__form-input'
                ></textarea>
                <div>
                    <button type='submit'>Create Class</button>
                </div>
                <div>
                    {errors.map((error) => (
                        <div key={error}>{error}</div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default CreateClassForm;