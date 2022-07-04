import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { register, reset } from '../features/auth/authSlice';

function Register() {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
 });

 const { name, email, password, passwordConfirm } = formData;
 const dispatch = useDispatch();

 const { user, isLoading, isSuccess, isError, message } = useSelector(
  (state) => state.auth
 );

 useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  // Redirect when logged in
  if (isSuccess || user) {
   navigate('/');
  }
  dispatch(reset());
 }, [isError, isSuccess, user, message, navigate, dispatch]);

 const onSubmit = (e) => {
  e.preventDefault();

  if (password !== passwordConfirm) {
   toast.error('Passwords do not match');
  } else {
   const userData = {
    name,
    email,
    password,
   };

   dispatch(register(userData));
  }
 };

 const onChange = (e) => {
  setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };

 //  if (loading) {
 //   return <Spinner />;
 //  }
 return (
  <>
   <section className='heading'>
    <h1>
     <FaUser /> Register
    </h1>
    <p>Please create an acount</p>
   </section>

   <section className='form'>
    <form onSubmit={onSubmit}>
     <div className='form-group'>
      <input
       type='text'
       placeholder='Enter your name'
       className=''
       id='name'
       name='name'
       value={name}
       required
       onChange={onChange}
      />
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
      <input
       type='password'
       placeholder='Confirm password'
       className='form-control'
       id='passwordConfirm'
       name='passwordConfirm'
       value={passwordConfirm}
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

export default Register;
