import axios from "axios";
import jwt_decode from "jwt-decode";
// import { logout } from "@app/utils/logout";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

function refreshTokensIfExpired() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (
    accessToken != null &&
    isAccessTokenExpired(accessToken) &&
    refreshToken != null
  ) {
    useRefreshToken(refreshToken);
  }
}

function isAccessTokenExpired(accessToken: string): boolean {
  try {
    const decodedToken = jwt_decode(accessToken) as any;
    console.log(decodedToken);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return true;
  }
}

async function useRefreshToken(refreshToken: string) {
  try {
    console.log("refresh token = " + refreshToken);
    const response = await axios.post(
      "http://localhost:8080/api/user/userefreshtoken",
      { refreshToken }
    );
    const { access_token, id_token } = response.data.data;
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("idToken", id_token);
  } catch (error) {
    logout();
    console.log("error is here" + error);
  }
}

api.interceptors.request.use(
  async (config) => {
    try {
      refreshTokensIfExpired();
      const accessToken = localStorage.getItem("accessToken");
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Token refresh failed:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
