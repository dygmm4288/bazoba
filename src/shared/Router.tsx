import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorWrapper from '../pages/EditorWrapper';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/detail" element={<div>detail page</div>} />
        <Route path="/write" element={<EditorWrapper />} />
        <Route path="/write/:id" element={<EditorWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
