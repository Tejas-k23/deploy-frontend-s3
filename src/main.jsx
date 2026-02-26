import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_J7PCnIeWi",
    client_id: "1hbg0up1kfmfmg4k1q3o6pkmc2",
    redirect_uri: "https://dqhh7o5eaocpb.cloudfront.net",
    response_type: "code",
    scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
