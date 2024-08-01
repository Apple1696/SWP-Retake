import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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

const AllRoutes = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/login' ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gold-value" element={<GoldValue />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/pick-promotion" element={<PickPromotion />} />
            <Route path="/order-report" element={<OrderReport />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/order-details/:orderNumber" element={<OrderDetails />} />
            <Route path="/customer" element={<CustomerList />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/payment/:orderNumber" element={<Payment />} />
            <Route path="/product" element={<Product />} />
            <Route path="/rebuy" element={<Rebuy />} />
          </Routes>
        </Sidebar>
      )}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default App;
