import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Home</div>} />
        <Route path='/detail' element={<div>detail page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
