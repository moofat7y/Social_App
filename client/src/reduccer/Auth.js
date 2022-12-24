const auth = (
  state = { ...JSON.parse(window.localStorage.getItem("profile")) },
  action
) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, authData: action.payload };

    case "SIGNIN_FAILED":
      throw new Error(action.payload.message);
    case "UPDATE_AUTH":
      const profile = JSON.parse(window.localStorage.getItem("profile"));
      const newProfile = { ...profile, userData: action.payload.updatedUser };
      window.localStorage.setItem("profile", JSON.stringify(newProfile));
      return { ...newProfile };
    case "UPADTE_PROFILEIMAGE":
      const oldProfile = JSON.parse(window.localStorage.getItem("profile"));
      const updatedProfileImage = {
        ...oldProfile,
        userData: action.payload.user,
      };
      window.localStorage.setItem(
        "profile",
        JSON.stringify(updatedProfileImage)
      );
      return updatedProfileImage;
    case "UPADTE_COVERIMAGE":
      const old = JSON.parse(window.localStorage.getItem("profile"));
      const updatedProfileCover = {
        ...old,
        userData: action.payload,
      };
      window.localStorage.setItem(
        "profile",
        JSON.stringify(updatedProfileCover)
      );
      return updatedProfileCover;

    default:
      return { ...state };
  }
};

export default auth;
