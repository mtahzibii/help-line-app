import { useEffect } from 'react';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import { FaPlus } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

function Ticket() {
 const { ticket, isError, message, isLoading } = useSelector(
  (state) => state.ticket
 );
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { ticketId } = useParams();

 //  Get ticket by page loading
 useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  dispatch(getTicket(ticketId));
 }, [dispatch, message, isError, ticketId]);

 const onTicketClose = () => {
  dispatch(closeTicket(ticketId));
  toast.success('Ticket closed successfully');
  navigate('/tickets');
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div className='ticket-page'>
   <header className='ticket-header'>
    <BackButton url='/tickets' />
    <h2>
     Ticket ID: {ticket._id}
     <span className={`status status-${ticket.status}`}>{ticket.status}</span>
    </h2>
    <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
    <h3>Product: {ticket.product}</h3>
    <hr />

    <div className='ticket-desc'>
     <h2>Description of issue</h2>
     <p>{ticket.description}</p>
    </div>

    <h2>Notes</h2>
   </header>

   <button className='btn'>
    <FaPlus />
    Add Note
   </button>

   {ticket.status !== 'closed' && (
    <button onClick={onTicketClose} className='btn btn-block btn-danger'>
     Close Ticket
    </button>
   )}
  </div>
 );
}

export default Ticket;
