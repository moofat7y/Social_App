const messages = (state = { chatId: "", messages: [] }, action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      return action.payload;
    case "SEND_MESSAGE":
      return {
        ...state,
        messages:
          action.payload.chatId === state.chatId
            ? [...state.messages, action.payload]
            : state.messages,
      };
    default:
      return state;
  }
};

export default messages;
