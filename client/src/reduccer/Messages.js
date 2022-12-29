const messages = (
  state = { chatId: "", messages: [], chatOwner: "" },
  action
) => {
  switch (action.type) {
    case "GET_MESSAGES":
      return { ...state, ...action.payload };
    case "SEND_MESSAGE":
      return {
        ...state,
        messages:
          action.payload.chatId === state.chatId
            ? [...state.messages, action.payload]
            : state.messages,
      };
    case "SELECT_CHAT":
      return { ...state, messages: [], chatOwner: action.payload };
    case "SELECTED_NULL":
      return { chatId: "", messages: [], chatOwner: "" };
    default:
      return state;
  }
};

export default messages;
