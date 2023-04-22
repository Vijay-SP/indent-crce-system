import { useState } from 'react';
import PocketBase from 'pocketbase';
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pb = new PocketBase('http://127.0.0.1:8090');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Authenticate user with email and password
      const authData = await pb.collection('users').authWithPassword(email, password);
      const user = authData.record;
      console.log(user);
      toast.success("Login successful!");
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user.role === 'member') {
        router.push('/member/dashboard');
      }
      
    } catch (error) {
      setError(error.message);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log In
        </button>
      </div>
    </form>
    <ToastContainer />
  </div>
  
    
  );
}
