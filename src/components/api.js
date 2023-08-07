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
  baseURL: 'https://showroom-admin.ikhbaldwiyan.repl.co/',
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

const apiShowroomRecentLive = axios.create({
  baseURL: 'https://dc.crstlnz.site',
});

const getRecentLive = async (sort, page, filter, order, perpage) => {
  try {
    const response = await apiShowroomRecentLive.get(
      `/api/showroom/recent?sort=${sort}&page=${page}&filter=${filter}&order=${order}&perpage=${perpage}`
    );
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data dari API Showroom Recent Live:', error);
    return null;
  }
};
// Export semua fungsi yang diperlukan
export { getShowroomData, getShowroomAdminData, getRecentLive};
