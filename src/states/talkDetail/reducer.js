import { TALK_DETAIL_ACTION_TYPE } from './action';

export function talkDetailReducer(talkDetail = null, action = {}) {
  switch (action.type) {
    case TALK_DETAIL_ACTION_TYPE.RECEIVE_TALK_DETAIL:
      return action.payload.talkDetail;

    case TALK_DETAIL_ACTION_TYPE.CLEAR_TALK_DETAIL:
      return null;

    case TALK_DETAIL_ACTION_TYPE.TOGGLE_LIKE_TALK_DETAIL:
      return {
        ...talkDetail,
        likes: talkDetail.likes.includes(action.payload.userId)
          ? talkDetail.likes.filter((id) => id !== action.payload.userId)
          : [action.payload.userId, ...talkDetail.likes],
      };

    default:
      return talkDetail;
  }
}
