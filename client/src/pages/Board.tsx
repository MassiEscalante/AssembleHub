import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage'; // Import ApiMessage type
import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (!auth.loggedIn()) {
      navigate('/login');
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

  // Updated deleteIndvTicket function to return ApiMessage
  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId); // This should return an ApiMessage from ticketAPI
      await fetchTickets();
      return data; // Ensure ApiMessage is returned
    } catch (err) {
      console.error('Failed to delete ticket:', err);
      throw new Error('Delete ticket failed');
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
        <Link to='/create'>New Ticket</Link>
      </button>
      <div className='board-display'>
        {boardStates.map((status) => {
          const filteredTickets = tickets.filter(ticket => ticket.status === status);
          return (
            <Swimlane 
              title={status} 
              key={status} 
              tickets={filteredTickets} 
              deleteTicket={deleteIndvTicket} // Passes deleteIndvTicket with corrected type
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;