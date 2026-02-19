import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPropertyById } from '../services/propertyService';

function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
}

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError(err.message || 'Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="property-details">
        <div className="details-loading">
          <div className="loading-spinner"></div>
          <p>Loading property...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-details">
        <div className="details-error">
          <p>{error}</p>
          <Link to="/" className="btn-primary">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details">
        <div className="details-error">
          <p>Property not found</p>
          <Link to="/" className="btn-primary">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="property-details">
      <Link to="/" className="back-link">
        ← Back to listings
      </Link>

      <div className="details-card">
        <div className="details-image">
          {property.imageUrls?.[0] ? (
            <img src={property.imageUrls[0]} alt={property.title} />
          ) : (
            <div className="details-placeholder">No image</div>
          )}
        </div>

        <div className="details-content">
          <span className="details-type">{property.type}</span>
          <h1 className="details-title">{property.title}</h1>
          <div className="details-meta">
            <span>{property.city}</span>
            <span className="details-price">
              ${property.price?.toLocaleString?.() ?? property.price}
            </span>
          </div>
          <p className="details-date">Listed on {formatDate(property.createdAt)}</p>
          {property.description && (
            <div className="details-description">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
