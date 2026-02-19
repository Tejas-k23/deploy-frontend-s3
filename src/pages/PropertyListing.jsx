import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProperties } from '../services/propertyService';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="property-listing">
        <div className="listing-header">
          <h1>Properties</h1>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-listing">
        <div className="listing-header">
          <h1>Properties</h1>
        </div>
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-listing">
      <div className="listing-header">
        <h1>Properties</h1>
        <Link to="/create" className="btn-primary">
          Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="empty-state">
          <p>No properties yet.</p>
          <Link to="/create">Create your first property</Link>
        </div>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="property-card"
            >
              <div className="property-card-image">
                {property.imageUrls?.[0] ? (
                  <img
                    src={property.imageUrls[0]}
                    alt={property.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="property-card-placeholder">No image</div>
                )}
              </div>
              <div className="property-card-content">
                <h3 className="property-card-title">{property.title}</h3>
                <span className="property-card-city">{property.city}</span>
                <span className="property-card-type">{property.type}</span>
                <span className="property-card-price">
                  ${property.price?.toLocaleString?.() ?? property.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
