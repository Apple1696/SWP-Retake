import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Sell from './../pages/Sell/Sell';
import Login from './../Login';
import Product from './../pages/Product/Product';
import Dashboard from './../pages/Dashboard/Dashboard';
import Promotion from './../pages/Promotion/Promotion';
import Rebuy from './../pages/Rebuy/Rebuy';
import OrderReport from './../pages/OrderReport/OrderReport';
import PickPromotion from './../pages/Sell/PickPromotion';
import GoldValue from './../pages/GoldValue/GoldValue';
import CustomerList from './../pages/Customer/CustomerList';
import CreateOrder from '../pages/OrderReport/CreateOrder';
import Payment from '../pages/Payment/Payment';
import OrderDetails from '../pages/OrderReport/OrderDetails';

const isAuthenticated = () => {
  // Add your authentication logic here
  // For example, checking if a token exists in localStorage
  return !!localStorage.getItem('token');
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />,
  },
  {
    path: "/gold-value",
    element: isAuthenticated() ? <GoldValue /> : <Navigate to="/login" />,
  },
  {
    path: "/sell",
    element: isAuthenticated() ? <Sell /> : <Navigate to="/login" />,
  },
  {
    path: "/pick-promotion",
    element: isAuthenticated() ? <PickPromotion /> : <Navigate to="/login" />,
  },
  {
    path: "/order-report",
    element: isAuthenticated() ? <OrderReport /> : <Navigate to="/login" />,
  },
  {
    path: "/create-order",
    element: isAuthenticated() ? <CreateOrder /> : <Navigate to="/login" />,
  },
  {
    path: "/order-details/:orderNumber",
    element: isAuthenticated() ? <OrderDetails /> : <Navigate to="/login" />,
  },
  {
    path: "/customer",
    element: isAuthenticated() ? <CustomerList /> : <Navigate to="/login" />,
  },
  {
    path: "/promotion",
    element: isAuthenticated() ? <Promotion /> : <Navigate to="/login" />,
  },
  {
    path: "/payment/:orderNumber",
    element: isAuthenticated() ? <Payment /> : <Navigate to="/login" />,
  },
  {
    path: "/product",
    element: isAuthenticated() ? <Product /> : <Navigate to="/login" />,
  },
  {
    path: "/rebuy",
    element: isAuthenticated() ? <Rebuy /> : <Navigate to="/login" />,
  },
  {
    path: "*",
    element: <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />,
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
