import axios from "axios";

//TODO
//Implement all API endpoints in functions for front end

const BaseUrl = "http://localhost:3000/api";

//Seach for user by username
export async function GetUserDataByUsername(username?: string) {
  try {
    const response = await axios.get(`${BaseUrl}/getuser/${username}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response.status == 404) {
      console.log(`User ${username} not found (404).`);
    } else {
      console.log(`Error on get request for ${username}:`, error.message);
    }
  }
}

//Check if username is already used
export async function DoesUsernameAlreadyExist(username: String) {
  const response = await axios.get(`${BaseUrl}/getuser/${username}`);
  if (response.status == 200) {
    return true;
  }
  return false;
}

//Create User
export async function CreateUser(username: string, password: string) {
  // const isInvalidUsername = await DoesUsernameAlreadyExist(username);
  // if (isInvalidUsername) {
  //   console.log(`username ${username} already exists`);
  //   return;
  // }
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
  } catch {
    console.log("Post user failed");
  }
}
