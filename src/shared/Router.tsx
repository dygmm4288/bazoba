import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthTest from '../components/AuthTest';
import Detail from '../pages/Detail';
import EditorWrapper from '../pages/EditorWrapper';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';
interface Props {
  isLogin: boolean;
}

export default function Router({ isLogin }: Props) {
  console.log({ isLogin });
  function ifLogin(Element: JSX.Element) {
    return isLogin ? Element : <Navigate to={'/login'} />;
  }
  function ifLogout(Element: JSX.Element) {
    // isLogin === true -> !isLogin = false, Navigate go home
    // isLogin === false -> !isLogin = true , Element go to LoginPage
    return !isLogin ? Element : <Navigate to={'/'} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthTest />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={ifLogout(<Login />)} />

          <Route path="/mypage" element={ifLogin(<Mypage />)} />
          <Route path="/write" element={ifLogin(<EditorWrapper />)} />
          <Route path="/write/:id" element={ifLogin(<EditorWrapper />)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
