import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, LOGOUT_USER, USER_PROFILE, UPDATE_USER_NAME } from '../store/store.action';

const initialState = {
  loginError: null,
  userProfile: '',
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, loginError: null };
    case USER_LOGIN_FAILURE:
      return { ...state, loginError: payload };
    case LOGOUT_USER:
      return { ...state, loginError: null, userProfile: '' };
    case USER_PROFILE:
      return { ...state, userProfile: payload };
    case UPDATE_USER_NAME:
      return { ...state, userProfile: { ...state.userProfile, userName: payload } };
    default:
      return state;
  }
};

export default userReducer;
