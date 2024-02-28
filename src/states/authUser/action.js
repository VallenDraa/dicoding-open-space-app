import api from '../../utils/api';

export const AUTH_USER_ACTION_TYPE = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

export function setAuthUserActionCreator(authUser) {
  return {
    type: AUTH_USER_ACTION_TYPE.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: AUTH_USER_ACTION_TYPE.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export function asyncSetAuthUser({ id, password }) {
  return async (dispatch) => {
    try {
      const token = await api.login({ id, password });

      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}
