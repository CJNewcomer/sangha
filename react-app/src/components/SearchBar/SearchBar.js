import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getClass } from '../../store/class';
import { getAllUsers} from '../../store/user';
import {convertTime} from '../ClassProfile/ClassProfile';

import './SearchBar.css';

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const classesFromStore = useSelector((state) => Object.values(state.class));
    const sessionUser = useSelector((state) => state.session.user)

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getClass())
        dispatch(getAllUsers())
    }, [dispatch]);


    useEffect(() => {
        setFilteredResults(
            classesFromStore.filter((yogaClass) =>
            yogaClass.teacher.first_name.toLowerCase().includes(search.toLowerCase()) ||
            yogaClass.locations.city.toLowerCase().includes(search.toLowerCase()) ||
            yogaClass.locations.state.toLowerCase().includes(search.toLowerCase()) ||
            yogaClass.locations.country.toLowerCase().includes(search.toLowerCase()) ||
            yogaClass.name.toLowerCase().includes(search.toLowerCase()) ||
            yogaClass.type.toLowerCase().includes(search.toLowerCase()) ||
            yogaClass.location.toLowerCase().includes(search.toLowerCase()) ||
            yogaClass.description.toLowerCase().includes(search.toLowerCase()))
        )
        // eslint-disable-next-line
    }, [search])

if (!filteredResults) return null;

return (
    <>
        <div className='search__container'>
            <div className='search__bar'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find Your Next Class or Teacher" type="text"/>
            </div>
        </div>
        <div className='result__container'>
            {filteredResults.map((yogaClass) => {
                const { id, class_image, name, type } = yogaClass;
                return (
                    <div className="results" key={id}>
                        <div onClick={() => {
                            if (sessionUser) {
                                history.push(`/classes/${id}`)
                            } else {
                                window.alert('Please make an account to view class details');
                            }
                        }}>
                            <div className='class__tile'>
                                <img src={class_image} alt=""/>
                                <div className='class__tile-info'>
                                    <h3>{name}</h3>
                                    <h3>{type}</h3>
                                    <h3>{yogaClass.teacher.first_name}</h3>
                                    <h3>{(new Date(yogaClass.time)).toLocaleString("en-US", convertTime)}</h3>
                                    <h3>{yogaClass.locations.city}, {yogaClass.locations.state}</h3>
                                    <h3>{yogaClass.locations.country}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </>
)}

export default SearchBar;