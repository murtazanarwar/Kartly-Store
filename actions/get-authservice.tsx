import axios from "axios";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/customer/auth`;

export async function me() {
  try {
    const response = await axios.get(`${URL}/me`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "User Fetching failed");
  }
}

export async function loginUser(user: { email: string; password: string }) {
  try {
    const response = await axios.post(`${URL}/log-in`, user, {
        withCredentials: true,
      });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Login failed");
  }
}

export async function signupUser(user: { email: string; password: string; username: string }) {
  try {
    const response = await axios.post(`${URL}/sign-up`, user);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Signup failed");
  }
}

export async function logoutUser() {
  try {
    const response = await axios.get(`${URL}/log-out`, {
        withCredentials: true,
      });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Logout failed");
  }
}

export async function forgotPassword(user: { email: string }) {
  try {
    const response = await axios.post(`${URL}/forgot-password`, user);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Forgot password failed");
  }
}

export async function changePassword(data: { token: string, newpassword: string, confirmpassword: string }) {
  try {
    const response = await axios.post(`${URL}/change-password`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Password Change failed");
  }
}

export async function verifyEmail(token: { token: string }) {
  try {
    const response = await axios.post(`${URL}/verify-email`, token);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Email Verification failed");
  }
}
