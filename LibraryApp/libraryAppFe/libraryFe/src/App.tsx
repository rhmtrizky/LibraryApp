import { useDispatch } from 'react-redux';
import AllMembers from './component/AllMembers';
import FormLogin from './component/FormLogin';
import FormRegister from './component/FormRegister';
import PageProfile from './component/PageProfile';
import Sidebar from './component/Sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import API, { setAuthToken } from './lib/Api';
import { AUTH_CHECK } from './stores/rootReducer';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get('auth/check');
      dispatch(AUTH_CHECK(response.data));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate('/login');
      console.log('login gagal', error);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <div>
        {isLoading ? null : (
          <Routes>
            <Route
              path="/"
              element={<PageProfile />}
            />
            <Route
              path="/books"
              element={<Sidebar />}
            />
            <Route
              path="/members"
              element={<AllMembers />}
            />
            <Route
              path="/register"
              element={<FormRegister />}
            />
            <Route
              path="/login"
              element={<FormLogin />}
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
