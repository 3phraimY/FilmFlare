import "./Friends.css";
import { useContext, useEffect, useState } from "react";
import userIcon from "../assets/user-icon.png";
import addUserIcon from "../assets/add-user.png";
import { AddFriend, GetAllUsers } from "../hooks/UserApi";
import { UserContext } from "../contexts/UserDataContext";

function Friends() {
  const context = useContext(UserContext);
  const [isFriendSearchActive, setIsFriendSearchActive] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [recommendedFriends, setRecommendedFriends] = useState<Array<string>>(
    []
  );

  if (!context) {
    return <div>Loading...</div>;
  }
  const { user, refreshUserData } = context;

  const handleSearch = async () => {
    const addFriendMessage = await AddFriend(user!.Username, searchText);
    if (addFriendMessage !== "success") {
      setSearchError(addFriendMessage);
    } else {
      setSearchError(null);
      refreshUserData();
    }
  };

  const handleAddFriend = async (username: string) => {
    const response = await AddFriend(user!.Username, username);
    if (response !== "success") {
      setSearchError("error");
    } else {
      setSearchError(null);
      refreshUserData();
    }
  };

  useEffect(() => {
    const getRandomRecommendations = async () => {
      const response = await GetAllUsers();
      if (response) {
        const currentFriendsUsernames =
          user?.Friends.map((friend) => friend.Username) || [];
        const filteredUsers = response.filter(
          (u: any) =>
            u.Username !== user?.Username &&
            !currentFriendsUsernames.includes(u.Username)
        );
        const recommended = filteredUsers
          .slice(0, 5)
          .map((u: any) => u.Username);
        setRecommendedFriends(recommended);
      }
    };
    getRandomRecommendations();
  }, [user]);

  return (
    <>
      {isFriendSearchActive && (
        <div className="search-wrapper">
          <div className="search-text" style={{ display: "flex" }}>
            <div className="search-text-words">Add Friend</div>
            <div className="search-text-button">
              <button
                className="search-text-button"
                onClick={() => setIsFriendSearchActive(false)}
              >
                <img
                  height={30}
                  width={30}
                  src="https://icon-library.com/images/close-x-icon/close-x-icon-17.jpg"
                />
              </button>
            </div>
          </div>
          <input
            className="search-field"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          {searchError && <div className="search-error">{searchError} </div>}
          <button
            className="search-add-user-button"
            onClick={() => handleSearch()}
          >
            Add
          </button>
        </div>
      )}
      <div className="friends-border-wrapper">
        <div className="current-friends-wrapper">
          <div className="current-friends-title">
            <div className="current-friends-text">Current Friends</div>
            <div className="add-user-wrapper">
              <button
                className="add-user-button"
                onClick={() => setIsFriendSearchActive(true)}
              >
                <img src={addUserIcon} height={30} width={30} />
              </button>
            </div>
          </div>
          <div className="current-friends-content">
            {user?.Friends.map((friend) => (
              <div key={friend.Username}>
                <img
                  src={userIcon}
                  height={20}
                  width={20}
                  style={{ marginRight: "10px" }}
                />
                {friend.Username}
              </div>
            ))}
          </div>
        </div>
        <div className="recommended-friends-wrapper">
          <div className="recommended-friends-title">Recommended Friends</div>
          <div className="recommended-friends-content">
            {recommendedFriends.map((recommendedFriend) => (
              <div key={recommendedFriend}>
                <button
                  style={{ backgroundColor: "#ee6c4d", width: "50px" }}
                  onClick={() => handleAddFriend(recommendedFriend)}
                >
                  <img
                    src={addUserIcon}
                    height={20}
                    width={20}
                    style={{ marginRight: "10px" }}
                  />
                </button>
                {recommendedFriend}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Friends;
