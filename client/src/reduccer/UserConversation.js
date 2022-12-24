const UserConversation = (state = [], action) => {
  switch (action.type) {
    case "GET_CONVERSATION":
      window.localStorage.setItem(
        "userConversation",
        JSON.stringify(action.payload)
      );
      return [...action.payload];
    case "ADD_CONVERSATION":
      return [...state, action.payload];
    default:
      return [...state];
  }
};

export default UserConversation;
