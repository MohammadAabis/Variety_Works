import React, { useState } from 'react';
import { Signin } from '../API/Users';
import { useDispatch, useSelector } from 'react-redux'; 
import { loginSuccess, loginFailure } from '../store/reducer/authReducer'; 
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const error = useSelector((state) => state.auth.error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form datas:', formData);

        if(!formData.email || !formData.password){
            setMessage("Please fill required fields")
            setTimeout(function(){
                setMessage('')
            },3000)
            return;
        }
              
        Signin(formData).then((resp) =>{
            if(resp.data.status === 200){                
                // dispatch(loginSuccess(resp.data.data.token, resp.data.data.user));
                // navigate('/dashboard');
                try { 
                    const user = { email: formData.email, password: formData.password }; 
                    dispatch(loginSuccess(user)); 
                    navigate('/');
                } catch (err) { dispatch(loginFailure(error))}
            }
            else{
                setMessage(resp.data.msg)
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
