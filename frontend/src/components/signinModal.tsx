// components/SignInModal.js
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../handlers/redux/hooks';
import { loginValidator } from '../utils/validators';
import { loginUser } from '../handlers/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function SignInModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  const [errors, setErrors]: any = useState({});

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: any) => state.auth);
  const router = useRouter(); // Initialize the router
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.email.value;
    const validation = loginValidator(email, password);
    if(validation.error){
      errors.email = validation.email;
      errors.password = validation.password;
      setErrors(errors);
    }else{
      console.log("Dispatching login user =========")
      dispatch(loginUser({ email, password })).then((action) => {
        if (loginUser.fulfilled.match(action)) {
          // toast login success
          onClose();  // Close modal if login is successful
          // router.push("/shop")
        } else {
          // toast erroru
        }
      });
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-2xl text-green-600 font-semibold mb-4">Sign In</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <button
          onClick={onClose}
          className="mt-4 text-blue-600 hover:underline text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
