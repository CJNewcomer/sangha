// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUserClasses } from '../../store/user_classes';
// import './Calendar.css';

// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';

// const DashboardCalendar = () => {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector((state) => state.session.user);
    
//     const handleClick = (e) => {
//         e.preventDefault();
//     }

//     useEffect(() => {
//         if (sessionUser) dispatch(getUserClasses(sessionUser.id))
//     }, [dispatch])

//     return (
//         <div className='calendar__container'>
//             <FullCalendar
//                 plugins={[ dayGridPlugin, timeGridPlugin ]}
//                 events={sessionUser.classes}
//                 eventClick={handleClick}
//                 initialView="dayGridMonth"
//             />
//         </div>
//     )
// }

// export default DashboardCalendar;