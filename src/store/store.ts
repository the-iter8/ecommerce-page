import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import productsReducer from "./products";
import cartReducer from "./cart";
import adminReducer from "./admin";
import globalReducer from "./global";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    global: globalReducer,
    products: productsReducer,
    cart: cartReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
