import axios from "axios";
export default async function fetchWeather(query) {
  try {
    const { data } = await axios.get(import.meta.env.VITE_URL, {
      params: {
        q: query,
        units: "metrics",
        appid: import.meta.env.VITE_APIKEY,
      },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("City not found");
    }
    throw error;
  }
}
