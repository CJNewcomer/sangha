const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export const authenticate = () => async(dispatch) => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const user = await response.json();
  if (!user.errors) {
      dispatch(setUser(user));
  }
  return user;
}

export const demoUserLogin = () => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'demo@aa.io',
      password: 'password',
    })
  });
  const user = await response.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const user = await response.json();
    if (!user.errors) {
        dispatch(setUser(user));
    }
    return user;
}

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  dispatch(removeUser());
  return await response.json();
};


export const signUp = (username, first_name, last_name, email, is_teacher, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      first_name,
      last_name,
      email,
      is_teacher: is_teacher === "true",
      password,
    }),
  });
  const user = await response.json();
  if (!user.errors) {
        dispatch(setUser(user));
    }
    return user;

}

const sessionReducer = (state={user:null}, action) => {
    let newState = {...state};
    switch(action.type) {
        case SET_USER:
            newState.user = action.payload
            return newState;
        case REMOVE_USER:
            newState.user = null
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;