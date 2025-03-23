import axios from "axios";
export const GetAuthUserData = async (token: String) => {
  try {
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: 'Bearer' + token } },
    );
    return userInfo.data;
  }
  catch (error) {
    return error;
  }
};