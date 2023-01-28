import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorService,
  getAllDoctorsService,
  saveInfoDoctorService,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("Error: ", e);
    }
  };
};

export const fetchGenderSuccess = (userInfo) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: userInfo,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

// ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("Error: ", e);
    }
  };
};

export const fetchRoleSuccess = (userInfo) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: userInfo,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

// POSITION
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("Error: ", e);
    }
  };
};

export const fetchPositionSuccess = (userInfo) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: userInfo,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUserService(data);
      console.log("check create user: ", res);
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess());
        dispatch(fetchUserStart());
        toast.success("Create a new user successfully!");
      } else {
        dispatch(createUserFail());
        toast.error("Create a new user failed!");
      }
    } catch (e) {
      dispatch(createUserFail());
      toast.error("Create a new user failed!");
      console.log("Error: ", e);
    }
  };
};

export const createUserSuccess = (userInfo) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: userInfo,
});

export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

export const fetchUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let res2 = await getTopDoctorService(3);
      console.log("res", res);
      console.log("res2 top doctor", res2);
      if (res && res.errCode === 0) {
        let reverseUsers = res.users.reverse();
        dispatch(fetchUserSuccess(reverseUsers));
      } else {
        dispatch(fetchUserFail());
      }
    } catch (e) {
      dispatch(fetchUserFail());
      console.log("Error: ", e);
    }
  };
};

export const fetchUserSuccess = (allUsers) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  data: allUsers,
});

export const fetchUserFail = () => ({
  type: actionTypes.FETCH_USER_FAIL,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log("check delete user: ", res);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchUserStart());
        toast.success("Delete a new user successfully!");
      } else {
        dispatch(deleteUserFail());
        toast.error("Delete a new user failed!");
      }
    } catch (e) {
      dispatch(deleteUserFail());
      toast.error("Delete a new user failed!");
      console.log("Error: ", e);
    }
  };
};

export const deleteUserSuccess = (userInfo) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  data: userInfo,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log("check update user: ", res);
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchUserStart());
        toast.success("Update a new user successfully!");
      } else {
        dispatch(editUserFail());
        toast.error("Update a new user failed!");
      }
    } catch (e) {
      dispatch(editUserFail());
      toast.error("Update a new user failed!");
      console.log("Error: ", e);
    }
  };
};

export const editUserSuccess = (userInfo) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  data: userInfo,
});

export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchTopDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorService("");
      console.log("res top doctors", res);
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorsSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorsFail());
      }
    } catch (e) {
      dispatch(fetchTopDoctorsFail());
      console.log("Error: ", e);
    }
  };
};

export const fetchTopDoctorsSuccess = (doctors) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  data: doctors,
});

export const fetchTopDoctorsFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
});

export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      console.log("res all doctors", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorsFail());
      }
    } catch (e) {
      dispatch(fetchAllDoctorsFail());
      console.log("Error: ", e);
    }
  };
};

export const fetchAllDoctorsSuccess = (doctors) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: doctors,
});

export const fetchAllDoctorsFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
});

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInfoDoctorService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
        });
        toast.success("Save info doctor successfully!");
      } else {
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
        });
        toast.error("Save info doctor failed!");
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
      });
      toast.error("Save info doctor failed!");
      console.log("Error: ", e);
    }
  };
};
