/* eslint-disable */
import { Routes, Route, } from "react-router-dom";
import LandingPage from './views/components/LandingPage/LandingPage'

function App() {

  return (
  <Routes>
		<Route path="/" element={<LandingPage />} />
		<Route path="teams" element={<Teams />} />
		<Route path="new" element={<NewTeamForm />} />
	</Routes>
  );
}

export default App;
