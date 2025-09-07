import './AuthForm.css';
import React, { useState } from 'react';
import { useUser } from '@/lib/state';

type SignUpFormProps = {
  onSignUp: () => void;
  onSwitchToLogin: () => void;
};
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function SignUpForm({ onSignUp, onSwitchToLogin }: SignUpFormProps) {
  const { setName, setCollege, setState } = useUser();
  const [nameInput, setNameInput] = useState('');
  const [collegeInput, setCollegeInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Frontend: Attempting to sign up with email:', email);

    try {
      const newUser = {
        name: nameInput,
        email,
        password,
        college: collegeInput,
        state: stateInput,
      };

      const response = await fetch(`${API_BASE_URL}/api/auth/register`,  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        // If response is not 2xx, it's an error
        console.error('Frontend: Server responded with an error:', data.msg);
        setError(data.msg || `Error: ${response.statusText}`);
      } else {
        console.log('Frontend: Sign up successful!');
        // Update the user state immediately after successful sign up
        setName(nameInput);
        setCollege(collegeInput);
        setState(stateInput);
        onSignUp(); // This switches the view to the login form
      }
    } catch (err) {
      console.error('Frontend: A network or CORS error likely occurred.', err);
      setError('Could not connect to the server. Is it running?');
    }
  };

  return (
    <div className="auth-form-container">
      <h1>Sign Up</h1>
      <p>Create an account to begin your training.</p>
      {error && <p className="error-message" style={{ color: 'var(--red-500)', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required value={nameInput} onChange={e => setNameInput(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input type="email" id="signup-email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input type="password" id="signup-password" name="password" required minLength={5} value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-group optional">
          <label htmlFor="college">College / Organization (Optional)</label>
          <input type="text" id="college" name="college" value={collegeInput} onChange={e => setCollegeInput(e.target.value)} placeholder="Helps the AI cook up better bait" />
        </div>
        <div className="form-group optional">
          <label htmlFor="state">State (Optional)</label>
          <input type="text" id="state" name="state" value={stateInput} onChange={e => setStateInput(e.target.value)} />
        </div>
        <button type="submit" className="button primary auth-button">
          Create Account
        </button>
      </form>
      <p className="switch-view-text">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="switch-view-button">
          Log In
        </button>
      </p>
    </div>
  );
}