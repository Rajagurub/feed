import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { selectPosts } from "../../../store/posts/postsSelectors";
import { createPost, updatePost, fetchPosts } from "../../../store/posts/postsSlice";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  closeFunction: () => void;
  id?: number | null;
  post?:any|null;
}

const PostSchema = Yup.object({
  title: Yup.string().required("Title required"),
  body: Yup.string().required("Body required"),
});

const CreateAndUpdatePost: React.FC<Props> = ({
  open,
  closeFunction,
  id,
  post
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);

  const isEdit = Boolean(post);

  const initialValues = {
    title: "",
    body: "",
  };

//   useEffect(() => {
//     if (isEdit) {
//       const post = posts.find((p) => p.id === id);
//       if (post) {
//         initialValues.title = post.title;
//         initialValues.body = post.body;
//       }
//     }
//   }, [id, posts]);

  if (!open) return null;

  const handleSubmit = async (values: any) => {
    try{
  if (isEdit && post.id) {
      await dispatch(
        updatePost({
         id: post.id,
          data: values,
        })
        
      );
       toast.success("Post is updated successfully");
    } else {
      await dispatch(createPost(values));
      toast.success("Post created successfully");
    }

   // dispatch(fetchPosts());
    closeFunction();
    }
    catch(e){
         toast.error("Post creation failed");
    }
  
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update Post" : "Create Post"}
        </h2>

        <Formik
         initialValues={{
    title: post?.title || "",
    body: post?.body || "",
  }}
  
          validationSchema={PostSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">

              <div>
                <Field
                  name="title"
                  placeholder="Enter title"
                  className="w-full border p-2 rounded"
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm">
                    {`${errors.title}`}
                  </p>
                )}
              </div>

              <div>
                <Field
                  name="body"
                  placeholder="Enter body"
                  as="textarea"
                  className="w-full border p-2 rounded"
                />
                {errors.body && touched.body && (
                  <p className="text-red-500 text-sm">
                    {`${errors.body}`}
                  </p>
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

export default CreateAndUpdatePost;