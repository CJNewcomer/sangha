import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

  if (!loaded) {
    return "loading...";
  }

// SOCKETIO
// state hooks
const [messages, setMessages] = useState([
  "Hello and Welcome"]);
  const [message, setMessage] = useState("");

// method will be called first time app renders and every time message length changes
const getMessages = () => {
  socket.on('message', msg => {
    setMessages([...messages, msg.msg.message]);
  });
};

// will call when message length changes
useEffect(() => {
  getMessages();
}, [messages.length]);


const onChange = e => {
  setMessage(e.target.value);
};


const onClick = () => {
  if (message !=="") {
    // when button clicked - emit message to server
    socket.emit("message", JSON.stringify({message, sender_id, receiver_id}));
    setMessage("");
  } else {
    alert("Please add a message.")
  }
};


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
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path='/search'>
          <SearchBar />
        </Route>
        <ProtectedRoute path="/home" exact={true} authenticated={!!sessionUser} >
          <LandingPage />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

