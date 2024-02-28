import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

export const IS_PRELOAD_ACTION_TYPE = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

export function setIsPreloadActionCreator(isPreload) {
  return {
    type: IS_PRELOAD_ACTION_TYPE.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
}
