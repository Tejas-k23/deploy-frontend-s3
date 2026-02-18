import React, { useState } from 'react';
import { getPresignedUrl, uploadFileToS3, createProperty } from '../lib/api';

const CreateProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        city: '',
        type: 'Rent',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setStatus({ type: 'error', message: 'Please select an image' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Step 1: Get presigned URL
            const { uploadUrl, key } = await getPresignedUrl(file.name, file.type);

            // Step 2: Upload to S3
            await uploadFileToS3(uploadUrl, file);

            // Step 3: Create property in DB
            const result = await createProperty({
                ...formData,
                price: Number(formData.price),
                imageKeys: [key]
            });

            setStatus({
                type: 'success',
                message: `Property created successfully! ID: ${result.item?.id || 'Success'}`
            });

            // Reset form
            setFormData({
                title: '',
                price: '',
                city: '',
                type: 'Rent',
                description: ''
            });
            setFile(null);
            setPreview(null);
            e.target.reset();

        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Something went wrong' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Add New Property</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Modern Apartment"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price ($) *</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            required
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="1200"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="London"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type *</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Beautiful 2-bedroom flat..."
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Property Image *</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required={!preview}
                        />
                        <div className="image-preview">
                            {preview ? (
                                <img src={preview} alt="Preview" />
                            ) : (
                                <span style={{ color: 'var(--text-secondary)' }}>No image selected</span>
                            )}
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading && <span className="loading-spinner"></span>}
                        {loading ? 'Creating Property...' : 'Create Property'}
                    </button>
                </form>

                {status.message && (
                    <div className={`status-message ${status.type}`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateProperty;
