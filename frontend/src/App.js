import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import Login from './pages/Login';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Ticket from './pages/Ticket';

function App() {
 return (
  <>
   <Router>
    <div className='container'>
     <Header />
     <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/tickets/:ticketId' element={<Ticket />} /> */}
      <Route path='/new-ticket' element={<PrivateRoute />}>
       <Route path='/new-ticket' element={<NewTicket />} />
      </Route>
      <Route path='/tickets' element={<PrivateRoute />}>
       <Route path='/tickets' element={<Tickets />} />
      </Route>
      <Route path='/tickets/:ticketId' element={<PrivateRoute />}>
       <Route path='/tickets/:ticketId' element={<Ticket />} />
      </Route>
     </Routes>
    </div>
   </Router>
   <ToastContainer />
  </>
 );
}

export default App;
