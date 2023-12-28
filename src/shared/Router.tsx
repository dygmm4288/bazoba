import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<div>detail page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
