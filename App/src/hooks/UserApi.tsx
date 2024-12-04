import axios from "axios";
import { Movie, Friend } from "../contexts/UserDataContext";

//TODO
//Implement all API endpoints in functions for front end

const BaseUrl = "http://localhost:3000/api";

// Get all users
export async function GetAllUsers() {
  try {
    const response = await axios.get(`${BaseUrl}/alluserdata`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching all users:", error.message);
    throw error;
  }
}

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

//enum to limit errors typing listname strings
export enum ListName {
  MyList = "MyList",
  MyFavorites = "MyFavorites",
  ToWatch = "ToWatch",
}

//add movie to specific list
export async function AddMovieToList(
  username: string,
  listName: ListName,
  IMDBid: string,
  Title: string,
  MoviePosterURL: string,
  UserRating?: number // Optional parameter
) {
  try {
    const user = await GetUserDataByUsername(username);

    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }

    // Create the new movie object with UserRating defaulting to 0 if not provided
    const newMovie: Movie = {
      IMDBid,
      Title,
      MoviePosterURL,
      UserRating: UserRating ?? 0,
    };

    // Append the new movie to the existing list
    const updatedList = [...user[listName], newMovie];

    // Prepare the update data
    const updateData = {
      [listName]: updatedList,
    };

    // Send the updated list to the server
    const response = await axios.patch(
      `${BaseUrl}/updateuser/${username}`,
      updateData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error updating user data for ${username}:`, error.message);
    throw error;
  }
}

// Update movie rating in a specific list
export async function UpdateMovieRating(
  username: string,
  IMDBid: string,
  newRating: number
) {
  try {
    const user = await GetUserDataByUsername(username);

    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }

    // Define the lists to search through
    const listsToUpdate = ["MyList", "MyFavorites", "ToWatch"];

    // Iterate through each list and update the movie rating if found
    let movieFound = false;
    for (const listName of listsToUpdate) {
      user[listName] = user[listName].map((movie: Movie) => {
        if (movie.IMDBid === IMDBid) {
          movieFound = true;
          return { ...movie, UserRating: newRating };
        }
        return movie;
      });
    }

    if (!movieFound) {
      return;
    }

    // Prepare the update data
    const updateData = {
      MyList: user.MyList,
      MyFavorites: user.MyFavorites,
      ToWatch: user.ToWatch,
    };

    // Send the updated lists to the server
    const response = await axios.patch(
      `${BaseUrl}/updateuser/${username}`,
      updateData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `Error updating movie rating for ${username}:`,
      error.message
    );
    throw error;
  }
}

// Delete movie from a specific list
export async function DeleteMovieFromList(
  username: string,
  listName: ListName,
  IMDBid: string
) {
  try {
    const user = await GetUserDataByUsername(username);

    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }

    // Filter out the movie with the specified IMDBid
    const updatedList = user[listName].filter(
      (movie: Movie) => movie.IMDBid !== IMDBid
    );

    // Prepare the update data
    const updateData = {
      [listName]: updatedList,
    };

    // Send the updated list to the server
    const response = await axios.patch(
      `${BaseUrl}/updateuser/${username}`,
      updateData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error deleting movie for ${username}:`, error.message);
    throw error;
  }
}

// Add friend to both users friend list
export async function AddFriend(username: string, friendUsername: string) {
  try {
    // Fetch the current user data using the existing function
    const user = await GetUserDataByUsername(username);
    const friendUser = await GetUserDataByUsername(friendUsername);

    if (!user) {
      return `User with username ${username} not found`;
    }

    if (!friendUser) {
      return `User with username ${friendUsername} not found`;
    }

    // Check if the friend is already in the user's friend list
    if (
      user.Friends.some((friend: Friend) => friend.Username === friendUsername)
    ) {
      return `User ${friendUsername} is already a friend`;
    }

    // Check if the user is already in the friend's friend list
    if (
      friendUser.Friends.some((friend: Friend) => friend.Username === username)
    ) {
      return `User ${username} is already a friend of ${friendUsername}`;
    }

    // Create new friend objects
    const newFriendForUser: Friend = {
      Username: friendUsername,
      Recommendations: [], // Initialize with an empty array
    };

    const newFriendForFriendUser: Friend = {
      Username: username,
      Recommendations: [], // Initialize with an empty array
    };

    // Add the new friends to the respective lists
    const updatedUserFriends = [...user.Friends, newFriendForUser];
    const updatedFriendUserFriends = [
      ...friendUser.Friends,
      newFriendForFriendUser,
    ];

    // Prepare the update data
    const updateUserFriendsData = {
      Friends: updatedUserFriends.map((friend: Friend) => ({
        Username: friend.Username,
        Recommendations: friend.Recommendations || [],
      })),
    };

    const updateFriendUserFriendsData = {
      Friends: updatedFriendUserFriends.map((friend: Friend) => ({
        Username: friend.Username,
        Recommendations: friend.Recommendations || [],
      })),
    };

    // Send the updated lists to the server
    await axios.patch(
      `${BaseUrl}/updateuser/${username}`,
      updateUserFriendsData
    );
    await axios.patch(
      `${BaseUrl}/updateuser/${friendUsername}`,
      updateFriendUserFriendsData
    );

    return "success";
  } catch (error: any) {
    return `Error adding friend for ${username}: ${error.message}`;
  }
}

// Remove friend from user's friend list
export async function RemoveFriend(username: string, friendUsername: string) {
  try {
    // Fetch the current user data
    const user = await GetUserDataByUsername(username);

    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }

    // Remove the friend from the current user's friends list
    const updatedUserFriends = user.Friends.filter(
      (friend: { Username: string }) => friend.Username !== friendUsername
    );

    // Prepare the update data for the current user
    const updateUserData = {
      Friends: updatedUserFriends,
    };

    // Send the updated list to the server for the current user
    const userResponse = await axios.patch(
      `${BaseUrl}/updateuser/${username}`,
      updateUserData
    );

    // Fetch the friend's data
    const friendUser = await GetUserDataByUsername(friendUsername);

    if (!friendUser) {
      throw new Error(`User with username ${friendUsername} not found`);
    }

    // Remove the current user from the friend's friends list
    const updatedFriendFriends = friendUser.Friends.filter(
      (friend: { Username: string }) => friend.Username !== username
    );

    // Prepare the update data for the friend
    const updateFriendData = {
      Friends: updatedFriendFriends,
    };

    // Send the updated list to the server for the friend
    const friendResponse = await axios.patch(
      `${BaseUrl}/updateuser/${friendUsername}`,
      updateFriendData
    );

    return true;
  } catch (error: any) {
    console.error(`Error removing friend for ${username}:`, error.message);
    return false;
  }
}

export async function AddMovieToFriendRecommendations(
  username: string,
  friendUsername: string,
  IMDBid: string,
  Title: string,
  MoviePosterURL: string,
  UserRating?: number // Optional parameter
) {
  try {
    // Fetch the friend's data using the existing function
    const friendUser = await GetUserDataByUsername(friendUsername);

    if (!friendUser) {
      throw new Error(`User with username ${friendUsername} not found`);
    }

    // Find the user in the friend's friends list
    const userIndex = friendUser.Friends.findIndex(
      (f: Friend) => f.Username === username
    );

    if (userIndex === -1) {
      throw new Error(
        `Friend with username ${username} not found in ${friendUsername}'s friends list`
      );
    }

    // Create the new movie object with UserRating defaulting to 0 if not provided
    const newMovie = {
      IMDBid,
      Title,
      MoviePosterURL,
      UserRating: UserRating ?? 0, // Default to 0 if UserRating is undefined
    };

    // Add the new movie to the user's recommendations list in the friend's data
    friendUser.Friends[userIndex].Recommendations.push(newMovie);

    // Prepare the update data
    const updateData = {
      Friends: friendUser.Friends,
    };

    // Send the updated list to the server
    const response = await axios.patch(
      `${BaseUrl}/updateuser/${friendUsername}`,
      updateData
    );

    return response.data;
  } catch (error: any) {
    console.error(
      `Error adding movie to friend's recommendations for ${username}:`,
      error.message
    );
    throw error;
  }
}

// Delete movie from user's own recommendations list
export async function DeleteMovieFromRecommendations(
  username: string,
  IMDBid: string
) {
  try {
    // Fetch the current user data using the existing function
    const user = await GetUserDataByUsername(username);

    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }

    // Remove the movie with the specified IMDBid from the recommendations list
    const updatedRecommendations = user.Recommendations.filter(
      (movie: Movie) => movie.IMDBid !== IMDBid
    );

    // Prepare the update data
    const updateData = {
      Recommendations: updatedRecommendations,
    };

    // Send the updated list to the server
    const response = await axios.patch(
      `${BaseUrl}/updateuser/${username}`,
      updateData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `Error deleting movie from recommendations for ${username}:`,
      error.message
    );
    throw error;
  }
}
