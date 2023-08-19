import React from "react";
import Main from "./pages/Main"
import NoPage from "./pages/NoPage"
import Paper from "./pages/Paper"

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path=":id" element={<Paper />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}