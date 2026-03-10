// src/configs/logout.js
export const logout = (navigate) => {
    // 1. Remove the token
    localStorage.removeItem("token");
    
    // 2. Clear any other user data if you have it
    // localStorage.clear(); 

    // 3. Redirect to login with a success message
    navigate("/", { 
        state: { message: "Logged out successfully!" },
        replace: true 
    });
};