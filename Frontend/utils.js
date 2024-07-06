import { redirect } from "react-router-dom";

// Constants for URLs
const LOGIN_URL = '/login';

export async function requireAuth() {
  
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            const redirectUrl = `${LOGIN_URL}?message=You must log in first.&redirectTo=${window.location.pathname}`;
            throw new redirect(redirectUrl);
        }
    
    } catch (error) {
        const redirectUrl = `${LOGIN_URL}?message=Error validating token&redirectTo=${window.location.pathname}`;
        throw new redirect(redirectUrl);
    }

    return true;
}
