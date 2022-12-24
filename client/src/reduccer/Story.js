const Story = (state = [], action) => {
  switch (action.type) {
    case "CREATE_STORY":
      return [...state, action.payload];

    case "STORIES":
      return [...action.payload];

    case "DELETE_STORY":
      return state.filter((story) => story._id !== action.payload._id);
    default:
      return state;
  }
};

export default Story;
