import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes'
import config from './Config';

function App() {
  // Get this from localStorage
  const userRole = config.roles.employer;

  return (
    <Router>
      <AppRoutes userRole={userRole} isLoggedIn={true} />
    </Router>
  )
}

export default App
