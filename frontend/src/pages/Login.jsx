import { FaSignInAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

function Login() {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [formData, setFormData] = useState({
  email: '',
  password: '',
 });

 //  Get states
 const { user, isError, isSuccess, message, isLoading } = useSelector(
  (state) => state.auth
 );

 const { email, password } = formData;

 const onSubmit = (e) => {
  e.preventDefault();

  const userData = {
   email,
   password,
  };

  dispatch(login(userData));
 };

 const onChange = (e) => {
  setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };

 return (
  <>
   <section className='heading'>
    <h1>
     <FaSignInAlt /> Login
    </h1>
    <p>Please log in to get support</p>
   </section>

   <section className='form'>
    <form onSubmit={onSubmit}>
     <div className='form-group'>
      <input
       type='email'
       placeholder='Enter your email'
       className='form-control'
       id='email'
       name='email'
       value={email}
       required
       onChange={onChange}
      />
      <input
       type='password'
       placeholder='Enter your password'
       className='form-control'
       id='password'
       name='password'
       value={password}
       required
       onChange={onChange}
      />
     </div>
     <button className='btn btn-block'>Submit</button>
    </form>
   </section>
  </>
 );
}

export default Login;
