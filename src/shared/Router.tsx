import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from '../pages/Detail';
import EditorWrapper from '../pages/EditorWrapper';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';
import AuthTest from '../components/AuthTest';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthTest />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/write" element={<EditorWrapper />} />
          <Route path="/write/:id" element={<EditorWrapper />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
