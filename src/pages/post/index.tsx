import React, { useEffect, useState, useMemo } from "react";
import { fetchPosts } from "../../store/posts/postsSlice";
import { selectPosts, selectPostsLoading } from "../../store/posts/postsSelectors";
import { fetchComments } from "../../store/comments/commentsSlice";
import { selectComments } from "../../store/comments/commentsSelectors";
import PostCard from "./components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import CreateAndUpdatePost from "./components/CreateAndupdatePost";
import DeletePostConfirm from "./components/DeletePostConfirm";
const Post: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
const [selectedPost, setSelectedPost] = useState<any | null>(null);
const [editOpen, setEditOpen] = useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteId, setDeleteId] = useState<number | null>(null);
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const comments = useSelector(selectComments);
  const [openModel,setOpenModel]=useState(false);
  const [userId,setUserID]=useState();
  
  const commentCountsByPostId = useMemo(() => {
    const counts: Record<number, number> = {};
    comments.forEach((comment) => {
      counts[comment.postId] = (counts[comment.postId] || 0) + 1;
    });
    return counts;
  }, [comments]);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6">Loading posts...</p>;
  }
  
console.log(posts,"posts")
  return (
    <div>
       <div className="flex py-4 px-10 items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        {"Posts"}
      </h2>

  
        <button
          onClick={()=>setOpenModel(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          {"Create post"}
        </button>
    

    </div>

    <div className="p-6 grid md:grid-cols-3 gap-6">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          postId={post.id}
          title={post.title}
          body={post.body}
          commentCount={commentCountsByPostId[post.id] || 0}
          onEditOpen={() => {
            setSelectedPost(post);
            setEditOpen(true);
          }}
          onDeleteOpen={() =>{setDeleteId(post.id);setDeleteOpen(true)}}
        />
      ))}
    </div>
    <CreateAndUpdatePost open={openModel} closeFunction={()=>setOpenModel(false)} />
      <CreateAndUpdatePost
  open={editOpen}
  closeFunction={() => setEditOpen(false)}
  post={selectedPost}
/>
<DeletePostConfirm
  open={deleteOpen}
  closeFunction={() => setDeleteOpen(false)}
  postId={deleteId}
/>
    </div>
  );
};
export default Post;