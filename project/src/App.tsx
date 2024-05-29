import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { LoginPage, LogoutPage, RegisterPage } from "./auth/AuthPage";
import { useAppSelector } from './redux/hooks';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import UserPage from './pages/UserPage';

export default function App() {
  const isLogin = useAppSelector(state => state.auth.isLogin);
  return (
      <BrowserRouter>
        {isLogin ? <NavigationBar /> : <><br/></>}
        <Routes>
          <Route path='/register' element={!isLogin ? <RegisterPage /> : <Navigate to='/products'/>}/>
          <Route path='/auth' element={!isLogin ? <LoginPage /> : <Navigate to='/products'/>}/>

          <Route path='*' element={<Navigate to= {isLogin ? '/products': '/auth'} />}/>
          <Route path='/products' element={isLogin ? <ProductPage /> : <Navigate to='/auth'/>}/>
          <Route path='/logout' element={isLogin ? <LogoutPage /> : <Navigate to='/auth'/>}/>
          <Route path='/carts' element={isLogin ? <CartPage />: <Navigate to='/auth'/>}/>
          <Route path='/users' element={isLogin ? <UserPage />: <Navigate to='/auth'/>}/>
        </Routes>
      </BrowserRouter>
  );
}