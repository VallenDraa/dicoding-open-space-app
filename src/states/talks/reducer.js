import { TALKS_ACTION_TYPE } from './action';

export function talksReducer(talks = [], action = {}) {
  switch (action.type) {
    case TALKS_ACTION_TYPE.RECEIVE_TALKS:
      return action.payload.talks;

    case TALKS_ACTION_TYPE.ADD_TALK:
      return [action.payload.talk, ...talks];

    case TALKS_ACTION_TYPE.TOGGLE_LIKE_TALK:
      return talks.map((talk) => {
        if (talk.id === action.payload.talkId) {
          return {
            ...talk,
            likes: talk.likes.includes(action.payload.userId)
              ? talk.likes.filter((id) => id !== action.payload.userId)
              : [action.payload.userId, ...talk.likes],
          };
        }
        return talk;
      });

    default:
      return talks;
  }
}
