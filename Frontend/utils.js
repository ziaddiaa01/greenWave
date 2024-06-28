import axios from 'axios';
import { redirect } from "react-router-dom";

// Constants for URLs
const LOGIN_URL = '/login';
const VALIDATE_TOKEN_API = '/api/auth/validateToken';

export async function requireAuth() {
    const accessToken = localStorage.getItem("accessToken");

    // If no access token, redirect to login with appropriate message
    if (!accessToken) {
        const redirectUrl = `${LOGIN_URL}?message=You must log in first.&redirectTo=${window.location.pathname}`;
        throw new redirect(redirectUrl);
    }

    try {
        // Validate the access token
        const response = await axios.post(VALIDATE_TOKEN_API, { token: accessToken });
        const { isValid } = response.data;

        // If token is not valid, throw an error
        if (!isValid) {
            throw new Error("Invalid token");
        }
    } catch (error) {
        // If an error occurs, redirect to login with appropriate message
        const redirectUrl = `${LOGIN_URL}?message=Error validating token&redirectTo=${window.location.pathname}`;
        throw new redirect(redirectUrl);
    }

    // If everything is fine, return true
    return true;
}
