const socketReduccer = (state = [], action) => {
  switch (action.type) {
    case "SOCKET":
      return action.payload;
    default:
      return state;
  }
};

export default socketReduccer;
