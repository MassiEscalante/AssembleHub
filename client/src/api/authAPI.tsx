import { UserLogin } from "../interfaces/UserLogin";

// Define the login function to send a POST request to the login route
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    // Check if the response was not successful
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Return the JWT token if login is successful
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export { login };
