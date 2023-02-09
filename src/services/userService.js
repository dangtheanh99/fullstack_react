import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveInfoDoctorService = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const getDetailDoctorService = (inputId) => {
  return axios.get(`/api/get-detail-doctor?id=${inputId}`);
};

const saveBulkScheduleService = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorService,
  getAllDoctorsService,
  saveInfoDoctorService,
  getDetailDoctorService,
  saveBulkScheduleService,
  getScheduleByDateService,
  getExtraInforDoctorService,
};
