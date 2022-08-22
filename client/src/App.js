/* eslint-disable */
import { Routes, Route, } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer"
import Auth from './hoc/auth'

function App() {
	
  return (
  <Routes>
		<Route path="/" element={<LandingPage />} />
		<Route path="login" element={<LoginPage />} />
		<Route path="register" element={<RegisterPage />} />
		
	</Routes>
  );
}

export default App;
