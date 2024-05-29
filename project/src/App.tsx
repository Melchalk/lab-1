import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { LoginPage, LogoutPage, RegisterPage } from "./auth/AuthPage";
import BookPage from './pages/CartPage';
import { useAppSelector } from './redux/hooks';
import MainPage from './pages/MainPage';
import ReaderPage from './pages/UserPage';

export default function App() {
  const isLogin = useAppSelector(state => state.auth.isLogin);
  return (
      <BrowserRouter>
        {isLogin ? <NavigationBar /> : <><br/></>}
        <Routes>
          <Route path='/register' element={!isLogin ? <RegisterPage /> : <Navigate to='/products'/>}/>
          <Route path='/auth' element={!isLogin ? <LoginPage /> : <Navigate to='/products'/>}/>

          <Route path='*' element={<Navigate to= {isLogin ? '/products': '/auth'} />}/>
          <Route path='/products' element={isLogin ? <MainPage /> : <Navigate to='/auth'/>}/>
          <Route path='/logout' element={isLogin ? <LogoutPage /> : <Navigate to='/auth'/>}/>
          <Route path='/carts' element={isLogin ? <BookPage />: <Navigate to='/auth'/>}/>
          <Route path='/users' element={isLogin ? <ReaderPage />: <Navigate to='/auth'/>}/>
        </Routes>
      </BrowserRouter>
  );
}