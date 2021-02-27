import axios from "axios";

const API_URL = "http://localhost:8080/user_management/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", user)
      .then(response => {
        console.log("response")
        console.log(response)
        if (response.status === 200) {
          console.log("inside1 loginAxios")
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
}

export default new AuthService();