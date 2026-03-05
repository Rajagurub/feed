import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchComments } from "../../store/comments/commentsSlice";
import { selectComments, selectCommentsLoading } from "../../store/comments/commentsSelectors";
import { fetchPosts } from "../../store/posts/postsSlice";
import { selectPosts } from "../../store/posts/postsSelectors";
import CreateAndUpdateComment from "./components/CreateAndUpdateComment";
import DeleteCommentConfirm from "./components/DeleteCommentConfirm";
import Button from "../../components/Button";

const Comments: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openModel, setOpenModel] = useState(false);

  const comments = useSelector(selectComments);
  const loading = useSelector(selectCommentsLoading);
  const posts = useSelector(selectPosts);

  const postIdNum = postId ? parseInt(postId, 10) : null;

  const filteredComments = useMemo(() => {
    if (!postIdNum) return [];
    return comments.filter((comment) => comment.postId === postIdNum);
  }, [comments, postIdNum]);

  const currentPost = useMemo(() => {
    if (!postIdNum) return null;
    return posts.find((post) => post.id === postIdNum);
  }, [posts, postIdNum]);

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6">Loading comments...</p>;
  }

  if (!postIdNum) {
    return <p className="p-6">Invalid post ID</p>;
  }

  return (
    <div>
      <div className="flex py-4 px-10 items-center justify-between mb-6">
        <div>
        
          <h2 className="text-2xl font-semibold text-gray-800">
            Comments for: {currentPost?.title || "Post"}
          </h2>
        </div>
        <button
          onClick={() => setOpenModel(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Create Comment
        </button>
      </div>

      <div className="p-6">
        {filteredComments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{comment.name}</h4>
                      <p className="text-sm text-gray-500">{comment.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        buttonFunction={() => {
                          setSelectedComment(comment);
                          setEditOpen(true);
                        }}
                        buttonText="Edit"
                        type="button"
                      />
                      <Button
                        buttonFunction={() => {
                          setDeleteId(comment.id);
                          setDeleteOpen(true);
                        }}
                        buttonText="Delete"
                        type="button"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateAndUpdateComment
        open={openModel}
        closeFunction={() => setOpenModel(false)}
        postId={postIdNum}
      />
      <CreateAndUpdateComment
        open={editOpen}
        closeFunction={() => {
          setEditOpen(false);
          setSelectedComment(null);
        }}
        comment={selectedComment}
        postId={postIdNum}
      />
      <DeleteCommentConfirm
        open={deleteOpen}
        closeFunction={() => {
          setDeleteOpen(false);
          setDeleteId(null);
        }}
        commentId={deleteId}
      />
    </div>
  );
};

export default Comments;
