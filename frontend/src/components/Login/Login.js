import React, { useState } from 'react';

import { useAuth } from './AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            await login(email, password);
        //    useNavigate('/dashboard');
            alert ('Login Successfully');
        }catch(err){
            console.log(err);
            alert("Login failed");
        }
    }







    return (
        <div className='flex justify-center items-center h-screen bg-slate-200'>
            <div className='bg-white mx-auto px-6 py-5 rounded shadow-md lg:w-[400px]'>
          
            <h2 className='font-custom text-3xl flex justify-center py-3 font-bold'>Comsats Console</h2>
            <form onSubmit={handleSubmit}>
            <div className='my-2'>
                <label className='block text-sm text-gray-700 font-bold mb-1'>Email:</label>
                <input type="email" placeholder='Enter Your Email' className='shadow rounded w-full border px-2 py-1 text-sm focus:outline-none text-gray-700' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className='my-4'>
                <label className='block text-sm text-gray-700 font-bold mb-1'>Password:</label>
                <input type="password" placeholder='Enter Your Password' className='shadow rounded w-full border px-2 py-1 text-sm focus:outline-none text-gray-700' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className='my-5'>
                <button type="submit" className='text-sm bg-green-600 text-white py-1 px-2 rounded w-full font-bold hover:bg-green-700'>Login</button>
                </div>
            </form>
        </div>

        </div>










    );
};

export default Login;