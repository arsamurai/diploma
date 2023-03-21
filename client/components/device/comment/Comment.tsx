import React from "react";
import { IComment } from "../../../models/IDevice";
import star from "../../../assets/images/icons/star.svg";
import starHalf from "../../../assets/images/icons/star-half.svg";
import starLine from "../../../assets/images/icons/star-line.svg";
import ReactStars from "react-rating-stars-component";
import Image from "next/image";

interface CommentProps {
	comment: IComment
}

const Comment: React.FC<CommentProps> = ({comment}) => {

  return (
    <div className="comment">
      <h3 className="comment__author">{comment.username}</h3>
			<div className="comment__body">
				<div className="rating comment__stars">
            <ReactStars
              className="react-rating"
              value={comment.stars}
              size={15}
              isHalf={true}
              filledIcon={<Image className="rating-star" src={star} alt="star" />}
              halfIcon={<Image className="rating-star" src={starHalf} alt="star" />}
              emptyIcon={<Image className="rating-star" src={starLine} alt="star" />}
            />
          </div>
				<p className="comment__text">{comment.text}</p>
				<div className="comment__block">
					<p className="comment__block-title">Переваги</p>
					<p className="comment__block-text">{comment.dignity}</p>
				</div>
				<div className="comment__block">
					<p className="comment__block-title">Недоліки</p>
					<p className="comment__block-text">{comment.dignity}</p>
				</div>
			</div>
      <div>
      </div>
    </div>
  );
};

export default Comment;
