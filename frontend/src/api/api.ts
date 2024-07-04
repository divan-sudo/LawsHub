import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchRegulations = async () => {
  const response = await axios.get(`${API_BASE_URL}/regulations`);
  return response.data;
};

export const createRegulation = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/regulations`, data);
  return response.data;
};

export const fetchLaws = async (regulationId: number) => {
  const response = await axios.get(`${API_BASE_URL}/laws/regulation/${regulationId}`);
  return response.data;
};

export const createLaw = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/laws`, data);
  return response.data;
};

export const fetchArticles = async (lawId: number) => {
  const response = await axios.get(`${API_BASE_URL}/articles/law/${lawId}`);
  return response.data;
};

export const createArticle = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/articles`, data);
  return response.data;
};

export const uploadImage = async (data: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/images/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
