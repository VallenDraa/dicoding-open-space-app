import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TalkDetail from '../components/TalkDetail';
import TalkItem from '../components/TalkItem';
import TalkReplyInput from '../components/TalkReplyInput';
import {
  asyncReceiveTalkDetail,
  asyncToogleLikeTalkDetail,
} from '../states/talkDetail/action';
import { asyncAddTalk } from '../states/talks/action';

function DetailPage() {
  const { id } = useParams();
  const talkDetail = useSelector((state) => state.talkDetail);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  const onLikeTalk = () => {
    dispatch(asyncToogleLikeTalkDetail());
  };

  const onReplyTalk = (text) => {
    dispatch(asyncAddTalk({ text, replyTo: id }));
  };

  if (!talkDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      {talkDetail.parent && (
        <div className="detail-page__parent">
          <h3>Replying To</h3>
          <TalkItem {...talkDetail.parent} authUser={authUser.id} />
        </div>
      )}
      <TalkDetail
        {...talkDetail}
        authUser={authUser.id}
        likeTalk={onLikeTalk}
      />
      <TalkReplyInput replyTalk={onReplyTalk} />
    </section>
  );
}

export default DetailPage;
