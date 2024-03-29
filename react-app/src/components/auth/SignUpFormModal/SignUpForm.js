import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/session';
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isTeacher, setIsTeacher] = useState("false");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = await dispatch(signUp(username, firstName, lastName, email, isTeacher, password, confirmPassword));
      if (user.errors) {
        setErrors(user.errors);
      } else {
        history.push("/home")
      }
    }
      setErrors((prevErrors) => [...prevErrors, 'Password fields must match.']);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateIsTeacher = (e) => {
    setIsTeacher(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };


  return (
    <>
      <form onSubmit={onSignUp}>
        <div className='signup__errors'>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label>First Name </label>
          <input
            type="text"
            name="first_name"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <label>Last Name </label>
          <input
            type="text"
            name="last_name"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div>
          <label>User Name </label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email </label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Student</label>
          <input className='is__student'
            type="radio"
            value="false"
            name="is_teacher"
            checked={isTeacher === "false"}
            onChange={updateIsTeacher}
            ></input>
        </div>
        <div>
          <label>Teacher</label>
          <input className='is__teacher'
            type="radio"
            value="true"
            name="is_teacher"
            checked={isTeacher === "true"}
            onChange={updateIsTeacher}
          ></input>
        </div>
        <div>
          <label>Password </label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Confirm Password </label>
          <input
            type="password"
            name="confirm_password"
            onChange={updateConfirmPassword}
            value={confirmPassword}
            required={true}
          ></input>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
