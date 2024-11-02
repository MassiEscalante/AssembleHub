import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import auth from './utils/auth';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!auth.loggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
