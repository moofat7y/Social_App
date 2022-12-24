const suggistion = (state = [], action) => {
  switch (action.type) {
    case "SUGGITIONS":
      return action.payload;
    default:
      return state;
  }
};

export default suggistion;
