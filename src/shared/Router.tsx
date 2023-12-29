import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthTest from '../components/AuthTest';
import Detail from '../pages/Detail';
import Editor from '../pages/Editor';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';
interface Props {
  isLogin: boolean;
}

export default function Router({ isLogin }: Props) {
  function ifLogin(Element: JSX.Element) {
    return isLogin ? Element : <Navigate to={'/login'} />;
  }
  function ifLogout(Element: JSX.Element) {
    return !isLogin ? Element : <Navigate to={'/'} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthTest />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={ifLogout(<Login />)} />

          <Route path="/mypage" element={ifLogin(<Mypage />)} />
          <Route path="/write" element={ifLogin(<Editor />)} />
          <Route path="/write/:id" element={ifLogin(<Editor />)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
