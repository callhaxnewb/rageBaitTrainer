import './AuthForm.css';
import React, { useState } from 'react';
import { useUser } from '@/lib/state'; // Import useUser

type LoginFormProps = {
  onLogin: () => void;
  onSwitchToSignUp: () => void;
};

export default function LoginForm({ onLogin, onSwitchToSignUp }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setName } = useUser(); // Get the setName function from the user store

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const loginUser = { email, password };
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginUser),
      });

      const data = await response.json();

      // *** THIS IS THE FIX ***
      // Only proceed if the server sends back a token
      if (data.token) {
        localStorage.setItem('auth-token', data.token);
        // Set the user's name in the global state
        if (data.user && data.user.name) {
          setName(data.user.name);
        }
        onLogin(); // Let the user into the app
      } else {
        // Otherwise, display the error message from the server
        setError(data.msg || "Login failed. Please try again.");
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
      console.error(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h1>Log In</h1>
      <p>Welcome back. Enter the arena.</p>
      {error && <p className="error-message" style={{ color: 'var(--red-500)', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="button primary auth-button">
          Log In
        </button>
      </form>
      <p className="switch-view-text">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignUp} className="switch-view-button">
          Sign Up
        </button>
      </p>
    </div>
  );
}