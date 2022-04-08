import axios from "axios"
import { SIGNUP_PATH } from "../../Services/Constans";

export const signup = () => {

  // const url = process.env.REACT_APP_SERVER_PATH + SIGNUP_PATH;

  // const data = {
  //   "name": "Abdul Qadoos",
  //   "email": "abdulqadoos.work@gmail.com",
  //   "password": "123456",
  //   "phone": "03164988701"
  // }
  // console.log(url, "server url dafs");

  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // };

  // axios.post(url, data)

  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

    var data = JSON.stringify({
      "name": "Muhammad Faisal",
      "email": "mfaisalsaeedcs@gmail.com",
      "password": "123456",
      "phone": "1234567890"
    });
    
    var config = {
      method: 'post',
      url: 'localhost:5000/signup',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}