import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "@/pages/Login";
import * as paths from "./paths";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
