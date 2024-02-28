import api from '../../utils/api';

export const USERS_ACTION_TYPE = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

export function receiveUsersActionCreator(users) {
  return {
    type: USERS_ACTION_TYPE.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

export function asyncRegisterUser({ id, name, password }) {
  return async () => {
    try {
      await api.register({ id, name, password });
    } catch (error) {
      alert(error.message);
    }
  };
}
