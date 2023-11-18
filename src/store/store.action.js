import axios from "axios";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const USER_PROFILE = "USER_PROFILE";
export const UPDATE_USER_NAME = "UPDATE_USER_NAME";

const API_BASE_URL = "http://localhost:3001/api/v1/user";
const LOGIN_URL = `${API_BASE_URL}/login`;
const PROFILE_URL = `${API_BASE_URL}/profile`;

// Actions
export const userLoginSuccess = () => ({
  type: USER_LOGIN_SUCCESS,
});

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const logoutUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  return {
    type: LOGOUT_USER,
  };
};

const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

const handleError = (dispatch, error) => {
  console.error(error);
  dispatch(userLoginFailure("Une erreur s'est produite."));
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};

// fonction pour gérer les erreurs de réponse
const handleResponseError = (dispatch, response) => {
  if (response.status === 401) {
    // Gérer le cas de statut 401 ici, par exemple, déconnecter l'utilisateur ou rediriger vers la page de connexion
    dispatch(logoutUser());
    // Ou rediriger vers la page de connexion
    // navigate("/login");
  } else {
    handleError(dispatch, new Error("Une erreur s'est produite."));
  }
};

export const loginUser = (email, password, navigate, rememberMe) => async (dispatch) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });

    if (response.status === 200) {
      const token = response.data.body.token;
      rememberMe ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
      navigate("/user-profil");
      dispatch(userLoginSuccess());
    } else {
      handleResponseError(dispatch, response);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  const token = getToken();

  if (!token) {
    return;
  }

  try {
    const response = await axios.post(PROFILE_URL, {}, { headers: { Authorization: `Bearer ${token}` } });

    if (response.status === 200) {
      dispatch({
        type: USER_PROFILE,
        payload: response.data.body,
      });
    } else {
      handleResponseError(dispatch, response);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const updateUserName = (userName) => async (dispatch) => {
  const token = getToken();

  if (!token) {
    return;
  }

  try {
    const response = await axios.put(PROFILE_URL, { userName }, { headers: { Authorization: `Bearer ${token}` } });

    if (response.status === 200) {
      dispatch({
        type: UPDATE_USER_NAME,
        payload: userName,
      });
    } else {
      handleResponseError(dispatch, response);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};
