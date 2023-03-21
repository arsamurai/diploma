import React, { useState } from 'react';
import { IComment, IDevice } from '../../../models/IDevice';
import { Button } from '../../other';
import AddCommentModal from '../../other/Modals/AddCommentModal';
import Comment from './Comment';

interface CommentsProps {
	comments: IComment[],
	device: IDevice,
}

const Comments: React.FC<CommentsProps> = ({comments, device }) => {
	const [activeCommentForm, setActiveCommentForm] = useState(false);

	const addCommentHandler = () => {
		setActiveCommentForm(true);
	}

	return (
		<div className="comments">
			<div className="comments__top">
      <h3 className="comments__title">Відгуки</h3>
				<Button className='comment-add' simplified onClick={addCommentHandler}>Додати відгук</Button>
			</div>
      <div className="comments__bottom">
        {!!comments.length ? [...comments].reverse().map((comment) => (
          <Comment key={comment._id} comment={comment} />
        )) : <div className='comments-empty'>Напишіть перший коментар...</div>}
      </div>
			<AddCommentModal active={activeCommentForm} setActive={setActiveCommentForm} device={device} />
    </div>
	)
}

export default Comments;