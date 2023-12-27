import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../components/Main';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<div>detail page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
