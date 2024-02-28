import api from '../../utils/api';

export const TALK_DETAIL_ACTION_TYPE = {
  RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  TOGGLE_LIKE_TALK_DETAIL: 'TOGGLE_LIKE_TALK_DETAIL',
};

export function receiveTalkDetailActionCreator(talkDetail) {
  return {
    type: TALK_DETAIL_ACTION_TYPE.RECEIVE_TALK_DETAIL,
    payload: {
      talkDetail,
    },
  };
}

export function clearTalkDetailActionCreator() {
  return {
    type: TALK_DETAIL_ACTION_TYPE.CLEAR_TALK_DETAIL,
  };
}

export function toggleLikeTalkDetailActionCreator(userId) {
  return {
    type: TALK_DETAIL_ACTION_TYPE.TOGGLE_LIKE_TALK_DETAIL,
    payload: {
      userId,
    },
  };
}

export function asyncReceiveTalkDetail(talkId) {
  return async (dispatch) => {
    try {
      dispatch(clearTalkDetailActionCreator());

      const talkDetail = await api.getTalkDetail(talkId);
      dispatch(receiveTalkDetailActionCreator(talkDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncToogleLikeTalkDetail() {
  return async (dispatch, getState) => {
    const { authUser, talkDetail } = getState();

    try {
      dispatch(toggleLikeTalkDetailActionCreator(authUser.id));

      await api.toggleLikeTalk(talkDetail.id);
    } catch (error) {
      dispatch(toggleLikeTalkDetailActionCreator(authUser.id));

      alert(error.message);
    }
  };
}
