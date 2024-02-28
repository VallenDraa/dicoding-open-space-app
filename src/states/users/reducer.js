import { USERS_ACTION_TYPE } from './action';

export function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case USERS_ACTION_TYPE.RECEIVE_USERS:
      return action.payload.users;

    default:
      return users;
  }
}
