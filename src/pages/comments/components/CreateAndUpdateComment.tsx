import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createComment, updateComment, fetchComments } from "../../../store/comments/commentsSlice";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  closeFunction: () => void;
  comment?: any | null;
  postId: number;
}

const CommentSchema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  body: Yup.string().required("Body required"),
});

const CreateAndUpdateComment: React.FC<Props> = ({
  open,
  closeFunction,
  comment,
  postId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const isEdit = Boolean(comment);

  if (!open) return null;

  const handleSubmit = async (values: any) => {
    try {
      const commentData = {
        ...values,
        postId,
      };

      if (isEdit && comment.id) {
        await dispatch(
          updateComment({
            id: comment.id,
            data: commentData,
          })
        );
        toast.success("Comment updated successfully");
      } else {
        await dispatch(createComment(commentData));
        toast.success("Comment created successfully");
      }

      dispatch(fetchComments());
      closeFunction();
    } catch (e) {
      toast.error(isEdit ? "Comment update failed" : "Comment creation failed");
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update Comment" : "Create Comment"}
        </h2>

        <Formik
          initialValues={{
            name: comment?.name || "",
            email: comment?.email || "",
            body: comment?.body || "",
          }}
          validationSchema={CommentSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  placeholder="Enter name"
                  className="w-full border p-2 rounded"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{`${errors.name}`}</p>
                )}
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full border p-2 rounded"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{`${errors.email}`}</p>
                )}
              </div>

              <div>
                <Field
                  name="body"
                  placeholder="Enter comment"
                  as="textarea"
                  className="w-full border p-2 rounded"
                  rows={4}
                />
                {errors.body && touched.body && (
                  <p className="text-red-500 text-sm">{`${errors.body}`}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeFunction}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default CreateAndUpdateComment;
