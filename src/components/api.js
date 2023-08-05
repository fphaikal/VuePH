import axios from 'axios';

// Buat instance axios untuk API Showroom
const apiShowroom = axios.create({
  baseURL: 'https://jkt48-showroom-api.vercel.app',
});

// Function untuk mengambil data dari API Showroom
const getShowroomData = async (endpoint) => {
  try {
    const response = await apiShowroom.get(`/api/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data dari API Showroom:', error);
    return null;
  }
};

// Function untuk mengambil data dari API Showroom Admin
const apiShowroomAdmin = axios.create({
  baseURL: 'https://showroom-admin.ikhbaldwiyan.repl.co',
});

const getShowroomAdminData = async (endpoint) => {
  try {
    const response = await apiShowroomAdmin.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data dari API Showroom Admin:', error);
    return null;
  }
};

const getRecentLive = async (page, perpage) => {
  try {
    const response = await axios.get(`https://dc.crstlnz.site/api/showroom/recent?sort=date&page=${page}&filter=active&order=-1&perpage=${perpage}`);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data recent live dari API Showroom:', error);
    return [];
  }
};

// Export semua fungsi yang diperlukan
export { getShowroomData, getShowroomAdminData, getRecentLive };
