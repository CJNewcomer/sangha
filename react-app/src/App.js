import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

// components
import ProtectedRoute from "./components/NavBar/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import SplashPage from "./components/SplashPage";
import LandingPage from './components/LandingPage';
import CreateClassForm from './components/CreateClassForm';
import ClassProfile from './components/ClassProfile/ClassProfile';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import ClassReview from './components/ClassReviews/ClassReview';
import AboutDev from "./components/AboutDev/AboutDev";
import Messages from "./components/Messages";
import PageNotFound from "./components/PageNotFound/PageNotFound";

// import redux
import { authenticate } from "./store/session";
import { messages } from './store/messages';

// SOCKETIO 
  // endpoint variable
  let endPoint = "http://localhost:5000"
  // connect with server using socket.io
  let socket = io.connect(`${endPoint}`)


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    (async() => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  
  // SOCKETIO
  // state hooks
    const [messages, setMessages] = useState([
    "Hello and Welcome"]);
    const [message, setMessage] = useState("");
    
    // will call when message length changes
    useEffect(() => {
      getMessages();
    }, [messages.length]);
    
    // method will be called first time app renders and every time message length changes
    const getMessages = () => {
      socket.on('message', msg => {
        setMessages([...messages, msg]);
      });
    };
    
    // on change input field this will call
    const onChange = e => {
      setMessage(e.target.value);
    };
    
    // when send button pressed this method called
    const onClick = () => {
      if (message !== "") {
        // when button clicked - emit message to server
        socket.emit("message", JSON.stringify({message, sender_id:2, receiver_id:3}));
        setMessage("");
      } else {
        alert("Please add a message.")
      }
    };
    
    if (!loaded) {
      return "loading...";
    }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/classes/:classId" exact={true} authenticated={!!sessionUser}>
          <ClassProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/about" exact={true} authenticated={!!sessionUser}>
          <AboutDev />
        </ProtectedRoute>
        <ProtectedRoute path="/classes/:classId" exact={true} authenticated={!!sessionUser}>
          <ClassReview />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={!!sessionUser}>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/classes" exact={true} authenticated={!!sessionUser}>
          <CreateClassForm />
        </ProtectedRoute>
        <ProtectedRoute path='/messages' exact={true} authenticated={!!sessionUser}>
          <Messages />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path='/search'>
          <SearchBar />
        </Route>
        <ProtectedRoute path="/home" exact={true} authenticated={!!sessionUser} >
          <LandingPage />
        </ProtectedRoute>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

