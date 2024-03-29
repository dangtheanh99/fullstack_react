import actionTypes from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  listTime: [],
  allDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAIL:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAIL:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
      state.listTime = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_TIME_FAIL:
      state.listTime = [];
      return {
        ...state,
      };
    case actionTypes.GET_DOCTOR_INFOR_SUCCESS:
      state.allDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_DOCTOR_INFOR_FAIL:
      state.allDoctorInfor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
