import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

// components
import ProtectedRoute from './components/NavBar/ProtectedRoute';
import UserProfile from './components/UserProfile';
import SplashPage from './components/SplashPage';
import LandingPage from './components/LandingPage';
import CreateClassForm from './components/CreateClassForm';
import ClassProfile from './components/ClassProfile/ClassProfile';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import ClassReview from './components/ClassReviews/ClassReview';
import AboutDev from './components/AboutDev/AboutDev';
import Messages from './components/Messages';
import PageNotFound from './components/PageNotFound/PageNotFound';

// import redux
import { authenticate } from './store/session';

// SocketIO Setup
  // endpoint variable
  let endPoint;

  if (process.env.NODE_ENV === "production") {
    endPoint = "https://sangha-full-stack.herokuapp.com"
  }
  // connect with server using socket.io
  let socket = io.connect(`${endPoint}`);


function App() {
  // eslint-disable-next-line
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
    

  // SocketIO
  const [messages, setMessages] = useState(["Hello! Welcome!"]);
  const [message, setMessage] = useState("");

  // will call when first time app render and every time message length changes
  const getMessages = () => {
    socket.on('message', msg => {
      setMessages([...messages, msg.msg.message]);
    });
  };

  // useEffect will auto call when message length changes
  useEffect(() => {
    getMessages();
  }, [messages.length]);

  // if change in input field, onChange will call
  const onChange = e => {
    setMessage(e.target.value);
  };

  // when send button pressed, onClick will call
  const onClick = () => {
    if (message !== "") {
      // when button clicked emit message to server
      socket.emit("message", JSON.stringify({message}));
      setMessage("");
    } else {
      alert("Please Add A Message");
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
        <ProtectedRoute path="/home" exact={true} authenticated={!!sessionUser} >
          <LandingPage />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path='/search'>
          <SearchBar />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

