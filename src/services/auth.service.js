import axios from "axios";

const API_URL = "http://localhost:8080/user_management/";
const SuperAdminURL = "http://localhost:8080/superAdmin/"

class AuthService {

  superAdminLogin(user) {
    return axios
      .post(SuperAdminURL + "login", user)
      .then(response => {
        console.log("response")
        console.log(response)
        if (response.status === 200) {
          console.log("inside1 loginAxios")
          console.log(response.data)
          localStorage.setItem("superAdmin", JSON.stringify(response.data));
        }else{
          console.log("LoginAxios failed")
        }
        //console.log(response.data)
        return response.data;
      });
  }

  logoutSuperAdmin() {
    localStorage.removeItem("superAdmin");
  }
  
  login(user) {
    return axios
      .post(API_URL + "login", user)
      .then(response => {
        console.log("response")
        console.log(response)
        if (response.status === 200) {
          console.log("inside1 loginAxios")
          console.log(response.data)
          localStorage.setItem("user", JSON.stringify(response.data));
        }else{
          console.log("LoginAxios failed")
        }
        //console.log(response.data)
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", user);
  }

  getCurrentUser() {
    console.log("inside getUser")
    const getCurrentUser = JSON.parse(localStorage.getItem('user'));
    return getCurrentUser;
  }

  setCurrentSchool(schoolId){
    console.log("inside setCurrentSchool")
    localStorage.setItem("school", JSON.stringify(schoolId));
  }

  getCurrentSchool(){
    console.log("inside getCurrentSchool")
    const getCurrentSchool = JSON.parse(localStorage.getItem('school'));
    return getCurrentSchool;
  }
}

export default new AuthService();