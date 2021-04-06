const GET_USER = '/users/getUser';
const GET_USERS = '/users/get';
const ADD_USER = '/users/addUser';


const get = (users) => ({
  type: GET_USERS,
  users,
});

const getUser = (user) => ({
  type: GET_USER,
  user,
});


export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const getAllUsers = () => async (dispatch) => {
  const res = await fetch('/api/users/');
  const json = await res.json();
  if (res.ok) {
    dispatch(get(json.users));
  }
};

export const getOneUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  const json = await res.json();
  if (res.ok) {
    dispatch(getUser(json));
  }
};

const initState = {};

const userReducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case GET_USERS:
      for (let user of action.users) {
        newState[user.id] = user;
      }
      return newState;
    case GET_USER:
      newState[action.user.id] = action.user;
      return newState;
    case ADD_USER:
      newState[action.user.id] = action.user;
      return newState;
    default:
      return newState;
  }
};

export default userReducer;