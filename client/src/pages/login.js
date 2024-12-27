import React, { useState } from 'react';
import { Signin } from '../API/Users';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    // const dispatch = useDispatch(); 
    // const navigate = useNavigate(); 
    // const error = useSelector((state) => state.auth.error);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);

        if(!formData.email || !formData.password){
            setMessage("Please fill required fields")
            setTimeout(function(){
                setMessage('')
            },3000)
            return;
        }
              
    Signin(formData).then((resp) =>{console.log(resp.data,"success")
        if(resp.data.status === 200){                
            // dispatch(loginSuccess(resp.data.data.token, resp.data.data.user));
            // navigate('/dashboard');
            // try { 
            //     const user = { email: formData.email, password: formData.password }; 
            //     dispatch(loginSuccess(user)); 
            //     navigate('/welcome');
            // } catch (err) { dispatch(loginFailure(error))}
            // }
            setMessage("Login successful!")
            setTimeout(function(){
                setMessage("")
            },3000)
        }
        else{
            setMessage("Invalid login credentials")
            setTimeout(function(){
                setMessage('')
            },3000)
        }
    })

    };

    return (
        <div className="login"> 
            <form className="login-content"> 
                <h2 className="login-text">Login</h2>                  
                
                <label className="label">Email</label> 
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" placeholder="you@example.com" required /> 
            
                
                <label className="label">Password</label> 
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input" placeholder="Enter your password" required /> 
            
                <div className='remember-area col-12 col-md-10'>
                    <input type='checkbox' name="" className='signin-checkbox'/>
                    <p className='remember-me'>Remember me</p>                    
                </div>
                
                <button onClick={handleSubmit} type="submit" className="login-button" > Login </button>

                <div className="message-container">
                    {message && (          
                        <p className="message">{message}</p>          
                    )}
                </div>

                <div className='not-member'>
                    <p>Not a member?</p>
                    <a href="/signup">Sign Up</a>
                </div>


                
            </form> 
        </div>    
    );
};

export default Login;
