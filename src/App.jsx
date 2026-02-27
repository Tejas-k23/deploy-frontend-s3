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
    const clientId = "6fi868hi1efnalg61f6vafhiom";
    const logoutUri = "https://dqhh7o5eaocpb.cloudfront.net";
    const cognitoDomain = "https://eu-north-1ce6dbfl46.auth.eu-north-1.amazoncognito.com";
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
            <pre> Hello: {auth.user?.profile.email} </pre>
            <pre> ID Token: {auth.user?.id_token} </pre>
            <pre> Access Token: {auth.user?.access_token} </pre>
            <pre> Refresh Token: {auth.user?.refresh_token} </pre>

            <button onClick={() => auth.removeUser()}>Sign out</button>
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
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
