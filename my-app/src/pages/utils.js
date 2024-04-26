
export function requireAuth() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return false;
    }
    else{
        true
    }
}