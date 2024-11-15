import axios from "axios";

//TODO
//Implement all API endpoints in functions for front end

const BaseUrl = "http://localhost:3000/api";

//Seach for user by username
export async function GetUserDataByUsername(username: string) {
  try {
    const response = await axios.get(`${BaseUrl}/getuser/${username}`);
    return response.data;
  } catch (error: any) {
    if (error.response.status == 404) {
      return error.reponse;
    } else {
      console.log(`Error on get request for ${username}:`, error.message);
    }
  }
}

//Check if username is already used
export async function DoesUsernameAlreadyExist(username: string) {
  try {
    const response = await axios.get(`${BaseUrl}/getuser/${username}`);
    if (response.status == 200) {
      return true;
    }
  } catch {
    return false;
  }
}

//Create User
export async function CreateUser(username: string, password: string) {
  const isInvalidUsername = await DoesUsernameAlreadyExist(username);
  if (isInvalidUsername) {
    return false;
  }
  try {
    const NewUserData = {
      Username: username,
      Password: password,
      MyList: [],
      MyFavorites: [],
      ToWatch: [],
      Friends: [],
    };
    await axios.post(`${BaseUrl}/adduser`, NewUserData);
    return true;
  } catch {
    console.log("Post user failed");
  }
}
