import axios from "axios";

const API_URL = "http://localhost:8080/user_management/";
const SuperAdminURL = "http://localhost:8080/superAdmin/"

class AuthService {

  superAdminLogin(user) {
    return axios
      .post(API_URL + "login", user)
      .then(response => {
        console.log("response")
        console.log(response)
        if (response.status === 200) {
          console.log("inside1 loginAxios")
          console.log(response.data)
          localStorage.setItem("superAdmin", JSON.stringify(response.data));
        } else {
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
          if (user.type == 'School') {
            console.log("Inside Type School")
            axios
              .get('http://localhost:8080/searchSchool/search/')
              .then(response1 => {
                console.log("response from search")
                console.log(response1)
                console.log(response1.data)
                response1.data.map((item)=>{
                  if(item.adminID == response.data._id){
                    console.log("Setting Local stotage school")
                    localStorage.setItem("school", JSON.stringify({schoolID:item._id}));
                  }
                })
                // if(response1.data.adminID == response.data._id){
                //   console.log("Setting Local stotage school")
                //   localStorage.setItem("school", JSON.stringify(response1.data));
                // }
                
              });
          }
        } else {
          console.log("LoginAxios failed")
        }
        //console.log(response.data)
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("school");
  }

  register(user) {
    return axios.post(API_URL + "signup", user);
  }

  getCurrentUser() {
    console.log("inside getUser")
    const getCurrentUser = JSON.parse(localStorage.getItem('user'));
    return getCurrentUser;
  }

  setCurrentSchool(schoolId) {
    console.log("inside setCurrentSchool")
    localStorage.setItem("school", JSON.stringify(schoolId));
  }

  setSchoolFromAdminID(adminID) {
    return axios
      .get('http://localhost:8080/searchSchool/search/')
      .then(response => {
        console.log("response")
        console.log(response)
        if (response.status === 200) {
          console.log("inside1 loginAxios")
          console.log(response.data)
          localStorage.setItem("school", JSON.stringify(response.data._id));
        } else {
          console.log("LoginAxios failed")
        }
        //console.log(response.data)
        return response.data;
      });
  }

  getCurrentSchool() {
    console.log("inside getCurrentSchool")
    const getCurrentSchool = JSON.parse(localStorage.getItem('school'));
    return getCurrentSchool;
  }

  setSelectedUser(userID){
    console.log("inside setSelectedUser")
    localStorage.setItem("selectedUser", JSON.stringify(userID));
  }

  getSelectedUser() {
    console.log("inside getSelectedUser")
    const getSelectedUser = JSON.parse(localStorage.getItem('selectedUser'));
    return getSelectedUser;
  }
  
}

export default new AuthService();