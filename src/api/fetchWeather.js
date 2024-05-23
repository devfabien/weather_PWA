import axios from "axios";
export default async function fetchWeather(query) {
  const { data } = await axios.get(import.meta.env.VITE_URL, {
    params: {
      q: query,
      units: "metrics",
      appid: import.meta.env.VITE_APIKEY,
    },
  });

  return data;
}
