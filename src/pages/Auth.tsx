import React, { useState } from 'react';
import { Book, Mail, Lock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


// Custom icons for social logins since GitHub and Google aren't available in lucide-react
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 12 L16 12"></path>
    <path d="M12 8 L12 16"></path>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="9" r="3"></circle>
    <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"></path>
  </svg>
);

// Tab interface for switching between Sign In and Sign Up
const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex mb-6 border-b border-gray-200">
      <button
        className={`px-4 py-2 font-medium text-sm ${
          activeTab === 'signin' 
            ? 'text-purple-600 border-b-2 border-purple-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActiveTab('signin')}
      >
        Sign In
      </button>
      <button
        className={`px-4 py-2 font-medium text-sm ${
          activeTab === 'signup' 
            ? 'text-purple-600 border-b-2 border-purple-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActiveTab('signup')}
      >
        Sign Up
      </button>
    </div>
  );
};

// Social login buttons
const SocialLogins = () => {
  return (
    <div className="flex flex-col gap-3 w-full mt-4">
      <div className="flex items-center gap-3 w-full">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-xs text-gray-500">or continue with</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>
      <div className="flex gap-3 w-full">
        <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg w-1/2 hover:bg-gray-50 transition-colors">
          <GoogleIcon />
          <span className="text-sm">Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg w-1/2 hover:bg-gray-50 transition-colors">
          <GitHubIcon />
          <span className="text-sm">GitHub</span>
        </button>
      </div>
    </div>
  );
};

// Input field component
const InputField = ({ icon, type, placeholder, value, onChange }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
};

// Sign In Form

interface SignInResponse {
    message: string; // The message indicating the result of the sign-in
    token: string;   // The JWT token returned upon successful sign-in
}
// Sign In Form with Username
const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Basic validation
      if (!username || !password) {
        setError('Username and password are required.');
        return;
      }

    const res =await axios.post<SignInResponse>('http://192.168.31.111:8000/api/v1/user/signin/', {
        username: username,
        password: password
      })
    console.log("in the response ", res);
    if(res?.status === 200){ 
      navigate('/dashboard');
       await localStorage.setItem('token', res.data.token);
      setError(''); 
    
 
    }

    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <InputField 
          icon={<User  size={16} />} // Change icon to User
          type="text" 
          placeholder="Username" // Update placeholder
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <InputField 
          icon={<Lock size={16} />} 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <div className="flex justify-between items-center mt-1">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
            Remember me
          </label>
          <a href="#" className="text-sm text-purple-600 hover:text-purple-700">Forgot password?</a>
        </div>
        
        <button 
          type="submit" 
          className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors mt-2"
        >
          Sign In
          <ArrowRight size={16} />
        </button>
        
      </form>
    );
  };
  
  // Sign Up Form with Username
  const SignUpForm = ({setActiveTab}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Basic validation
      if (!username || !password) {
        setError('All fields are required.');
        return;
      }

      axios.post('http://192.168.31.111:8000/api/v1/user/signup/', {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
        if(res.status === 201){
          setActiveTab('signin');
          
Swal.fire({
  icon: 'success',
  title: 'Signup successful',
  text: 'You can now log in!',
});
          setError(''); 
        }
      })

      // Handle the submission logic here
      console.log(`Username: ${username}, Password: ${password}`);
      setError(''); // Clear error on successful submission
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <InputField 
          icon={<User  size={16} />} // Change icon to User
          type="text" 
          placeholder="Username" // Update placeholder
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <InputField 
          icon={<Lock size={16} />} 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <div className="flex items-start gap-2 mt-1">
          <input type="checkbox" className="mt-1 rounded text-purple-600 focus:ring-purple-500" />
          <p className="text-sm text-gray-600">
            I agree to the <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
          </p>
        </div>
        
        <button 
          type="submit" 
          className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors mt-2"
        >
          Create Account
          <ArrowRight size={16} />
        </button>
        
      </form>
    );
  };

// Main Authentication Component
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Book size={16} className="text-purple-600" />
          </div>
          <h1 className="text-xl font-medium text-gray-800">Second Brain</h1>
        </div>
        
        <h2 className="text-center text-2xl font-medium text-gray-800 mb-8">
          {activeTab === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'signin' ? <SignInForm /> : <SignUpForm  setActiveTab={setActiveTab} />}
        
        <p className="text-sm text-gray-500 text-center mt-6">
          {activeTab === 'signin' 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <button 
            className="text-purple-600 hover:text-purple-700"
            onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
          >
            {activeTab === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;