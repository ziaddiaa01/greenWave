
export function isLoggedIn() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return true;
    }
    else{
        return false
    }
}