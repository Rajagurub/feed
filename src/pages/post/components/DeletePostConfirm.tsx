import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { deletePost } from "../../../store/posts/postsSlice";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  closeFunction: () => void;
  postId: number | null;
}

const DeletePostConfirm: React.FC<Props> = ({
  open,
  closeFunction,
  postId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  if (!open || !postId) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(postId)).unwrap();

      toast.success("Post deleted successfully");

      closeFunction();
    } catch {
      toast.error("Delete failed");
    }
  };

  const portalRoot = document.getElementById("modal-root");

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg text-center">

        <h2 className="text-lg font-semibold mb-4">
          Are you sure want to delete this post?
        </h2>

        <div className="flex justify-center gap-4">

          <button
            onClick={closeFunction}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>,
    portalRoot
  );
};

export default DeletePostConfirm;