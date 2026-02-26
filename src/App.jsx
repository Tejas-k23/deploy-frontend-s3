import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateProperty from './pages/CreateProperty';
import PropertyListing from './pages/PropertyListing';
import PropertyDetails from './pages/PropertyDetails';
import Navbar from './components/Navbar';
import './styles.css';
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "786h0kv18ag887i842gta4vj0q";
    const logoutUri = "https://dqhh7o5eaocpb.cloudfront.net/"; // Using the redirect_uri as logout_uri
    const cognitoDomain = "https://eu-north-13tci1nu2w.auth.eu-north-1.amazoncognito.com"; // Extracted from authority or provided in cognito console
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (auth.error) {
    return <div className="error-container">Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div style={{ padding: '1rem', background: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
            <p>Welcome, {auth.user?.profile.email}</p>
            <button onClick={() => auth.removeUser()} className="auth-button">Sign out (Session)</button>
            <button onClick={signOutRedirect} className="auth-button">Sign out (Cognito)</button>
          </div>
          <Routes>
            <Route path="/" element={<PropertyListing />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/create" element={<CreateProperty />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <div className="auth-page">
      <h1>Welcome to AWS Property App</h1>
      <p>Please sign in to continue</p>
      <button onClick={() => auth.signinRedirect()} className="auth-button primary">Sign in</button>
      <button onClick={() => signOutRedirect()} className="auth-button">Sign out</button>
    </div>
  );
}

export default App;
