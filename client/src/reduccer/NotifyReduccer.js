const notifyReduccer = (
  state = { loading: false, data: [], sound: false },
  action
) => {
  switch (action.type) {
    case "GET_NOTIFY":
      return { ...state, data: action.payload };
    case "ADD_NOTIFY":
      return { ...state, data: [action.payload, ...state.data] };
    case "DELETE_NOTIFY":
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    default:
      return state;
  }
};

export default notifyReduccer;
