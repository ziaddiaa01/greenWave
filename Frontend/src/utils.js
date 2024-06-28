
export function isLoggedIn() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return false;
    }
    else{
        true
    }
}