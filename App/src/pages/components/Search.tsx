function Search() {
  return (
    <>
      <div>Search</div>
    </>
  );
}

/*
is a Seperate page. that lets you search for movies. 
call functions from hook file(movie.api)
we search for 10 movies at first. 
convert all of those ten items to ten different movie interfaces. (userdatacontext.)
iterate through all of them and create a tile that takens in the movie interface as a perameter. 
also be able to include the overlay for the moviedetails page. 
*/
export default Search;
