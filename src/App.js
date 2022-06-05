import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import Container from './components/Container';
// import PrivateRoute from './components/PrivateRoute';
// import PublicRoute from './components/PublicRoute';
import { authOperations, authSelectors } from './redux/auth';

const HomeView = lazy(() => import('./views/HomeView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));
const UploadView = lazy(() => import('./views/UploadView'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      {isFetchingCurrentUser ? (
        <h1>Показываем React Skeleton</h1>
      ) : (
        <>
          <AppBar />
          <Suspense fallback={<p>Загружаем...</p>}>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/register" restricted element={<RegisterView />} />
              <Route
                path="/login"
                redirectTo="/todos"
                restricted
                element={<LoginView />}
              />
              <Route
                path="/upload"
                redirectTo="/login"
                element={<UploadView />}
              />
            </Routes>
          </Suspense>
        </>
      )}
    </Container>
  );
}
