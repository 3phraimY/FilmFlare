import axios from "axios";

//(Using Luke's OMDB API Key)BaseMovieURLExample: http://www.omdbapi.com/?apikey=ec74cdeb&t=Ready+Player+One

//TODO
//create functions for all calls necessary from the IMDb endpoint
//create search by movie name
export async function GetMoviebyMovieName(MovieName: string) {
  try {
    MovieName?.replace(" ", "-");
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=ec74cdeb&s=${MovieName}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response.status == 404) {
      console.log(`MovieName: ${MovieName} not found (404).`);
    } else {
      console.log(`Error on get request for ${MovieName}:`, error.message);
    }
  }
}

//create search by movie id
export async function GetMoviebyID(MovieID: string) {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=ec74cdeb&i=${MovieID}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response.status == 404) {
      console.log(`MovieID: ${MovieID} not found (404).`);
    } else {
      console.log(`Error on get request for ${MovieID}:`, error.message);
    }
  }
}
