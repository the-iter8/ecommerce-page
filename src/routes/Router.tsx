import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants";

const ProductsPage = lazy(() => import("@/pages/products"));
const ProductDetail = lazy(
  () => import("@/pages/products/views/ProductDetail"),
);
const CartPage = lazy(() => import("@/pages/cart"));
const CheckoutPage = lazy(() => import("@/pages/checkout"));
const PaymentPage = lazy(() => import("@/pages/payment"));
const PaymentSuccess = lazy(
  () => import("@/pages/payment/views/PaymentSuccess"),
);
const AdminDashboard = lazy(() => import("@/pages/admin"));

const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path={ROUTES.HOME} element={<ProductsPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
        <Route path={ROUTES.PAYMENT_SUCCESS} element={<PaymentSuccess />} />
        <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
