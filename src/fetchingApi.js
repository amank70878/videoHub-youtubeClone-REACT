import axios from "axios";
const baseUrl = "https://youtube-v31.p.rapidapi.com";

const options = {
  url: baseUrl,
  params: {},
  headers: {
    "X-RapidAPI-Key": "e5ea049de9msh532a9427441ce64p178930jsnd319be21f4da",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchRapidApi = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`, options);
  return data;
};
