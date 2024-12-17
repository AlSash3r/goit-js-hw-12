import axios from 'axios';
const API_KEY = '47671198-bf70cd038d5f77d4168ecf4e9'; 
const BASE_URL = 'https://pixabay.com/api/';
const fetchImages = async (value, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
};
export default fetchImages;
