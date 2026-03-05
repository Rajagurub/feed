import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";


interface Props {
  postId: number;
  title: string;
  body: string;
  commentCount: number;
  onEditOpen: () => void;
  onDeleteOpen: () => void;
}


const PostCard: React.FC<Props> = ({
  postId,
  title,
  body,
  commentCount,
  onEditOpen,
  onDeleteOpen,
}) => {
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate(`/comments/${postId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-100 space-y-3">

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-gray-600 text-sm">{body}</p>

      <div
        onClick={handleCommentClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCommentClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View ${commentCount} comments`}
        className="flex items-center gap-2 text-sm cursor-pointer hover:underline transition-all duration-200"
      >
        <span className="font-semibold text-blue-600 hover:text-blue-700">
          {commentCount}
        </span>
        <span className="text-blue-600 hover:text-blue-700">
          {commentCount === 1 ? "comment" : "comments"}
        </span>
      </div>

      <div className="flex gap-3">

        <Button
          buttonFunction={onEditOpen}
          buttonText="Edit"
          type="button"
        />

        <Button
          buttonFunction={onDeleteOpen}
          buttonText="Delete"
          type="button"
        />

      </div>

    </div>
  );
};

export default PostCard;