const GET_USER = '/users/getUser';
const GET_USERS = '/users/get';
const ADD_USER = '/users/addUser';
const UPDATE_USER = '/users/updateUser';


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

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
})


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

export const updateOneUser = (user, userProfileImage = null) => async (dispatch) => {
  const {
    profile_image,
    image,
  } = user;

  const formData = new FormData();
  formData.append('profile_image', profile_image);

  if (image) formData.append('image', image);

  if (userProfileImage) {
    const res = await fetch(`/api/users/${userProfileImage}`, {
      method: 'PUT',
      body: formData,
    });

    const updatedProfile = await res.json();

    if (res.ok) {
      dispatch(updateUser(updatedProfile));
      return updatedProfile;
    } else {
      const errors = user;
      return errors;
    }
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
    case UPDATE_USER:
      newState[action.user.id] = action.user;
      return newState;
    default:
      return newState;
  }
};

export default userReducer;