import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { cartActions } from "@/store/cart";
import { GlobalLoader } from "@/components";
import Router from "./routes/Router";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartActions.fetchCart());
  }, [dispatch]);

  return (
    <>
      <GlobalLoader />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
