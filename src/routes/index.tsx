import { Suspense, lazy, FC, ReactNode } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import HomeLayout from '../layouts/HomeLayout';
import AuthGuard from '../guards/AuthGuard';

type LoadableComponentProps = Record<string, unknown>;

const Loadable =
  <P extends LoadableComponentProps>(
    Component: React.ComponentType<P>
  ): FC<P> =>
  (props: P) => {
    return (
      <Suspense
        fallback={
          <Loader/>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };


const Router: FC = () => {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
       
              <Login />
          
          )
        },
        {
          path: 'register',
          element: (
        
              <Register />
     
          )
        }
      ]
    },

    {
      path: '/',
      element: (
        <AuthGuard>
          <HomeLayout />
        </AuthGuard>
      ),
      children: [
        { index: true, element: <Post /> },
        { path: 'post', element: <Post /> },
        { path: 'comments/:postId', element: <Comments /> }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
     { path: '404', element: <NotFound /> },
  ]);
};
const Login=Loadable(lazy(() => import('../pages/Login')));
const Register=Loadable(lazy(() => import('../pages/Register')));
const NotFound = Loadable(lazy(() => import('../pages/NotFound')));
const Post = Loadable(lazy(() => import('../pages/post/index')));
const Comments = Loadable(lazy(() => import('../pages/comments/index')));
export default Router;