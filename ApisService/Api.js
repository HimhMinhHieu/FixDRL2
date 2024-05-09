import axios from "axios";

const HOST = "http://10.0.2.2:8000"

export const endpoints = {
    "comments" : `/comments/`,
    "hoatdongs": `/hoatdongs/`,
    "hoatdong_detail": (hoadtdongID) => `/hoatdongs/${hoadtdongID}/`,
    "hoatdong_diemdanh": (hoadtdongID) => `/hoatdongs/${hoadtdongID}/diemdanh/`,
    "hockis": `/hockis/`,
    "khoas": `/khoas/`,
    "khoas_detail": (khoaID) => `/khoas/${khoaID}/`,
    "likes": `/likes/`,
    "lops": `/lops/`,
    "minhchungs": `/minhchungs/`,
    "quyches": `/quyches/`,
    "tags": `/tags/`,
    "thanhtichs": `/thanhtichs/`,
    "thanhtichs_statpdf": `/thanhtichs/statspdf`,
    "users": `/users/`,
    "user_ctsv": `/users/ctsv/`,
    "user_current": `/users/current/`,
    "user_tlsv": `/users/tlsv/`,
    "usersvs": `/usersvs/`,
    "usersvs_detail": (userID) => `/usersvs/${userID}/`,
    "usersvs_detail_hoatdong": (userID) => `/usersvs/${userID}/hoat_dongs/`,
    "usersvs_detail_thanhtichs": (userID) => `/usersvs/${userID}/thanh_tichs/`,
    "login" : "/o/token/"
}

export const authApi = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export const apiLogin = () => axios.create ({
    baseURL: HOST,
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})

export default axios.create({
    baseURL: HOST
})