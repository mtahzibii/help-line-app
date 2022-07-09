import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';
import { toast } from 'react-toastify';

function Tickets() {
 const dispatch = useDispatch();
 const { isSuccess, isLoading, tickets, isError, message } = useSelector(
  (state) => state.ticket
 );

 useEffect(() => {
  return () => {
   if (isError) {
    toast.error(message);
   }

   if (isSuccess) {
    dispatch(reset());
   }
  };
 }, [dispatch, isSuccess, isError, message]);

 useEffect(() => {
  dispatch(getTickets());
 }, [dispatch]);

 if (isLoading) {
  return <Spinner />;
 }
 return (
  <>
   <BackButton url='/new-ticket' />
   <h1>Tickets</h1>
   <div className='tickets'>
    <div className='ticket-headings'>
     <div>Date</div>
     <div>Product</div>
     <div>Status</div>
    </div>
    {tickets.map((ticket) => (
     <TicketItem key={ticket._id} ticket={ticket} />
    ))}
   </div>
  </>
 );
}

export default Tickets;
