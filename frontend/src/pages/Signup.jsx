import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../util'

function Signup() {


  const [signupInfo , setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();


  const handleChange = (e) => {
    
      const {name, value} = e.target;
      //console.log(name, value); 
      const copySignupInfo = {...signupInfo};
      copySignupInfo[name] = value; 
      setSignupInfo(copySignupInfo) 

    
  }

  //console.log('signup info->', signupInfo);

  const handleSignup  = async (e) => {
    //to prevent it from refresing once clicked on sign-up
    e.preventDefault();
    const {name, email, password} = signupInfo; 
    if(!name || !email || !password){

      return handleError('All fields are required (name, email, password)'); 

    }

    try {
      const url = "http://localhost:3000/auth/signup"
      const res =  await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

       const result = await res.json();
       console.log(result);
       const {success, message, error} = result; 
       if(success){
        handleSuccess(message);
       
       setTimeout(() => {
        navigate('/login');
       }, 1000);
      }
       else if(error){
        const details = error?.message; 
        //console.log(details); 
        handleError(details); 
       }

       else if(!success){
        handleError(message); 
       }


    } catch (error) {

      handleError(err); 
      
    }
  }





  return (
    <div className = 'container'>
      <h1>SignUp</h1>
      <form onSubmit={handleSignup}>
         <div>
         <label htmlFor='name'>Name</label>
         <input 
         onChange={handleChange}
         type="text" 
         name='name'
         autoFocus
         placeholder='Enter you name..'
         value={signupInfo.name}
         />
        </div>
       <div>
         <label htmlFor='email'>Email</label>
         <input 
         onChange={handleChange}
         type="email" 
         name='email'
         placeholder='Enter you email..'
         value={signupInfo.email}
         />
      </div>
       <div>
         <label htmlFor='password'>Password</label>
         <input 
         onChange={handleChange}
         type="password" 
         name='password'
         placeholder='Enter you password..'
         value={signupInfo.password}
         />
        </div>
         <button type='submit'>Signup</button>
         <span>Already have an account 
          <Link to= '/login'>Login</Link>
         </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
