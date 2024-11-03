import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import auth from './utils/auth';

function App() {
  const navigate = useNavigate();
  const timeoutDuration = 3 * 60 * 1000; // 3 minutes in milliseconds

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!auth.loggedIn()) {
      navigate('/login');
    }

    // Inactivity handling
    const handleInactivity = () => {
      auth.logout(); // Logs out the user by clearing the JWT
      navigate('/login'); // Redirects to the login page
      alert('You have been logged out due to inactivity.');
    };

    let inactivityTimer = setTimeout(handleInactivity, timeoutDuration);

    const resetTimer = () => {
      clearTimeout(inactivityTimer); // Clears the existing timer
      inactivityTimer = setTimeout(handleInactivity, timeoutDuration); // Resets the timer
    };

    // Listens for user activity events to reset the inactivity timer
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    
    return () => {
      clearTimeout(inactivityTimer); // Clear the timer on component unmount
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
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
