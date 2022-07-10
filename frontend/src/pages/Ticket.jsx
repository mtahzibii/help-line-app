import { useEffect, useState } from 'react';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import {
 getNotes,
 createNote,
 reset as noteReset,
} from '../features/notes/noteSlice';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import { FaPlus } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NoteItem from '../components/NoteItem';

const customStyles = {
 content: {
  width: '600px',
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  position: 'relative',
 },
};

Modal.setAppElement('#root');

function Ticket() {
 const { ticket, isError, message, isLoading } = useSelector(
  (state) => state.ticket
 );

 const { notes, isLoading: notesIsLoading } = useSelector((state) => state.note);

 const [modalIsOpen, setModalIsOpen] = useState(false);
 const [noteText, setNoteText] = useState('');

 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { ticketId } = useParams();

 //  Get ticket and ticket's note by page loading
 useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  dispatch(getTicket(ticketId));
  dispatch(getNotes(ticketId));
  // eslint-disable-next-line
 }, [dispatch, message, isError, ticketId]);

 //  Close ticket
 const onTicketClose = () => {
  dispatch(closeTicket(ticketId));
  toast.success('Ticket closed successfully');
  navigate('/tickets');
 };

 //  Create note submit
 const onNoteSubmit = (e) => {
  e.preventDefault();
  dispatch(createNote({ noteText, ticketId }));
  dispatch(noteReset());
  closeModal();
 };

 // Open/close modal
 const openModal = () => setModalIsOpen(true);
 const closeModal = () => setModalIsOpen(false);

 if (isLoading || notesIsLoading) {
  return <Spinner />;
 }

 if (isError) {
  return <h3>Something Went Wrong</h3>;
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

   {/* Modal */}
   <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel='Add Note'
   >
    <h2>Add Note</h2>
    <button className='btn-close' onClick={closeModal}>
     X
    </button>
    <form onSubmit={onNoteSubmit}>
     <div className='form-group'>
      <textarea
       name='noteText'
       id='noteText'
       cols='30'
       rows='5'
       className='form-control'
       placeholder='Note text'
       value={noteText}
       onChange={(e) => setNoteText(e.target.value)}
      ></textarea>
     </div>
     <div className='form-group'>
      <button className='btn btn-block' type='submit'>
       Submit
      </button>
     </div>
    </form>
   </Modal>

   {ticket.status !== 'closed' && (
    <button className='btn' onClick={openModal}>
     <FaPlus />
     Add Note
    </button>
   )}

   {notes.map((note) => (
    <NoteItem key={note._id} note={note} />
   ))}

   {ticket.status !== 'closed' && (
    <button onClick={onTicketClose} className='btn btn-block btn-danger'>
     Close Ticket
    </button>
   )}
  </div>
 );
}

export default Ticket;
