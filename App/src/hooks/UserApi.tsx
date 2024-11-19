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

export const CreatedUserError = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }

    const data = await response.json();
    return { success: true, userId: data.userId };
  } catch (err) {
    console.error("Error in CreateUser:", err);
    throw err;
  }
};

export const FetchUserData = async (userId: string) => {
  try {
    const response = await fetch(`/api/user/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user data");

    return await response.json();
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw err;
  }
};

