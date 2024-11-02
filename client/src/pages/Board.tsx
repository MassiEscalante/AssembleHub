import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const checkLogin = () => {
    if (!auth.loggedIn()) {
      navigate('/login'); // Redirect if not logged in
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (auth.loggedIn()) {
      fetchTickets();
    }
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className='board'>
      <button type='button' id='create-ticket-link'>
        <Link to='/create' >New Ticket</Link>
      </button>
      <div className='board-display'>
        {boardStates.map((status) => {
          const filteredTickets = tickets.filter(ticket => ticket.status === status);
          return (
            <Swimlane 
              title={status} 
              key={status} 
              tickets={filteredTickets} 
              deleteTicket={deleteIndvTicket}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
