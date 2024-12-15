import React, { useState, useNavigate, useDispatch, useSelector } from 'react';

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
              
    // Signin(formData).then((resp) =>{
    //     if(resp.data.status === 200){                
    //         // dispatch(loginSuccess(resp.data.data.token, resp.data.data.user));
    //         // navigate('/dashboard');
    //         try { 
    //             const user = { email: formData.email, password: formData.password }; 
    //             dispatch(loginSuccess(user)); 
    //             navigate('/welcome');
    //         } catch (err) { dispatch(loginFailure(error))}
    //     }
    //     else{
    //         setMessage("Invalid login credentials")
    //         setTimeout(function(){
    //             setMessage('')
    //         },3000)
    //     }
    //})

    };

    return (
        <div className="login"> 
            <form className="login-content"> 
                <h2 className="login-text">Login</h2>                  
                
                <label className="label">Email</label> 
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" placeholder="you@example.com" required /> 
            
                
                <label className="label">Password</label> 
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input" placeholder="Enter your password" required /> 
            
                <div><input type='checkbox' name="" />
                <p className=''>Remember me</p>
                <a href="#" >Forgot Password</a></div>
                
                <button onClick={handleSubmit} type="submit" className="login-button" > Login </button> 
                {message && 
                <div> 
                    <p className='alert alert-info mt-3'>{message}</p>
                </div>
                } 
            </form> 
        </div>    
    );
};

export default Login;
