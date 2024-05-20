import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from './Components/NavigationBar';
import { LoginPage, RegisterPage } from './Pages/AuthPage';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='*' element={<Navigate to='/home'/>}/>
        <Route path='/auth' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  );
}