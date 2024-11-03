import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  // **New State for Sorting and Filtering**
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterByStatus, setFilterByStatus] = useState<string | null>(null);

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

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      await fetchTickets();
      return data;
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

  // Sort Handler
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // **New Filter Handler for Status**
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByStatus(e.target.value === 'all' ? null : e.target.value);
  };

  // Sort Logic
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'name') {
      return (a.name || '').localeCompare(b.name || '');
    } else if (sortBy === 'status') {
      return (a.status || '').localeCompare(b.status || '');
    } else if (sortBy === 'createdAt') {
      return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
    }
    return 0;
  });

  // **Filter Logic**
  const filteredTickets = filterByStatus
    ? sortedTickets.filter(ticket => ticket.status === filterByStatus)
    : sortedTickets;

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className='board'>
      <div className="board-controls">
        <button type='button' id='create-ticket-link'>
          <Link to='/create'>New Ticket</Link>
        </button>

        {/* Sorting Dropdown */}
        <select value={sortBy} onChange={handleSortChange} aria-label="Sort Tickets">
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
          <option value="createdAt">Sort by Date Created</option>
        </select>

        {/* **New Filter Dropdown** */}
        <select value={filterByStatus || 'all'} onChange={handleFilterChange} aria-label="Filter Tickets">
          <option value="all">Filter by Status (All)</option>
          {boardStates.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className='board-display'>
        {boardStates.map((status) => {
          const filteredSwimlaneTickets = filteredTickets.filter(ticket => ticket.status === status);
          return (
            <Swimlane 
              title={status} 
              key={status} 
              tickets={filteredSwimlaneTickets} 
              deleteTicket={deleteIndvTicket}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;