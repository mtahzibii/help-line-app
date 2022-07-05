import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const { user } = useSelector((state) => state.auth);

 const onLogout = () => {
  dispatch(logout());
  dispatch(reset());
  navigate('/');
 };

 return (
  <header className='header'>
   <Link to='/'>Support Desk</Link>
   <ul>
    {user ? (
     <button className='btn' onClick={onLogout}>
      <FaSignOutAlt /> Logout
     </button>
    ) : (
     <>
      <li>
       <Link to='/login'>
        <FaSignInAlt /> Login
       </Link>
      </li>
      <li>
       <Link to='/register'>
        <FaUser /> Register
       </Link>
      </li>
     </>
    )}
   </ul>
  </header>
 );
}

export default Header;
