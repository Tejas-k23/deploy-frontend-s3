# AWS Property Management Frontend

A production-ready React frontend built with Vite for managing property listings with AWS S3 image upload integration.

## Features
- Create Property Form with Title, Price, City, Type, and Description.
- Single image upload with preview functionality.
- Orchestrated upload flow (Presigned URL -> S3 PUT -> Backend Creation).
- Loading states and success/error handling.
- Environment variable configuration for API endpoints.

## Local Setup

### 1. Installation
```bash
npm install
```

### 2. Configuration
Create a `.env` file in the root directory (one is already provided in this project):
```env
VITE_API_BASE_URL=https://h7337u3o2i.execute-api.eu-north-1.amazonaws.com
```

### 3. Run Development Server
```bash
npm run dev
```

## Deployment

### 1. Build the Project
```bash
npm run build
```
This will create a `dist` folder.

### 2. S3 Static Hosting
- Create an S3 bucket (e.g., `my-property-app`).
- Enable **Static website hosting** in properties.
- Upload the contents of the `dist` folder to the bucket.
- Set the **Index document** to `index.html`.
- Ensure the bucket policy allows public read access (or use CloudFront).

### 3. Connecting with CloudFront
- Create a CloudFront Distribution.
- Set the **Origin domain** to your S3 bucket website endpoint.
- Under **Default cache behavior**, set **Viewer protocol policy** to `Redirect HTTP to HTTPS`.
- (Recommended) Use CloudFront **Origin Access Control (OAC)** to keep the S3 bucket private while allowing CloudFront access.
- Deploy and use the CloudFront URL.

## Git Commands
```bash
git init
git add .
git commit -m "Initial property frontend"
git remote add origin <repo-url>
git push -u origin main
```
