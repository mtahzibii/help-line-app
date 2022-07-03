import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function Header() {
 return (
  <header className='header'>
   <Link to='/'>Support Desk</Link>
   <ul>
    <li>
     <Link to='/login'>
      <FaSignInAlt /> Login
     </Link>
    </li>
    <li>
     <Link to='/register'>
      <FaSignOutAlt /> Register
     </Link>
    </li>
   </ul>
  </header>
 );
}

export default Header;
