import api from '../../utils/api';

export const TALKS_ACTION_TYPE = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

export function receiveTalksActionCreator(talks) {
  return {
    type: TALKS_ACTION_TYPE.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

export function addTalkActionCreator(talk) {
  return {
    type: TALKS_ACTION_TYPE.ADD_TALK,
    payload: {
      talk,
    },
  };
}

export function toggleLikeTalkActionCreator({ talkId, userId }) {
  return {
    type: TALKS_ACTION_TYPE.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    },
  };
}

export function asyncAddTalk({ text, replyTo = '' }) {
  return async (dispatch) => {
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncToogleLikeTalk(talkId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));

    try {
      await api.toggleLikeTalk(talkId);
    } catch (error) {
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));

      alert(error.message);
    }
  };
}
