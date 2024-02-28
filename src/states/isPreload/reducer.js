import { IS_PRELOAD_ACTION_TYPE } from './action';

export function isPreloadReducer(isPreload = true, action = {}) {
  switch (action.type) {
    case IS_PRELOAD_ACTION_TYPE.SET_IS_PRELOAD:
      return action.payload.isPreload;

    default:
      return isPreload;
  }
}
