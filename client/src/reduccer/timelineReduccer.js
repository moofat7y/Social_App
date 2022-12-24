const timeLineReduccer = (state = { posts: [], user: {} }, action) => {
  switch (action.type) {
    case "FETCH_TIMELINE":
      return { ...state, posts: [...action.payload] };
    case "GET_SINGLEPOST":
      return { ...state, posts: [action.payload] };

    case "TIMELINE_FAILED":
      throw new Error(action.payload);
    case "LIKE":
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload.post._id ? action.payload.post : post
        ),
        user: { ...state.user },
      };
    case "COMMENT":
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, action.payload.commentId],
              }
            : post
        ),
        user: { ...state.user },
      };
    case "DELETE_COMMENT":
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: [
                  ...post.comments.filter(
                    (id) => id !== action.payload.commentId
                  ),
                ],
              }
            : post
        ),
        user: { ...state.user },
      };
    case "UPLOAD_POST":
      console.log(action.payload);
      return { ...state, posts: [action.payload, ...state.posts] };
    case "UPLOAD_FAILED":
      console.log(action.payload);
    case "DELETE_POST":
      return {
        ...state,
        posts: [
          ...state.posts.filter((post) => post._id !== action.payload.postId),
        ],
      };
    case "FETCH_PROFILE":
      return {
        posts: [...action.payload.posts],
        user: { ...action.payload.user },
      };
    case "PROFLIE_FAILED": {
      throw new Error(action.payload);
    }
    case "UPDATED_PRIFLEIMAGEFAILED":
      throw new Error(action.payload);
    case "UNFOLLOW_USER":
    case "FOLLOW_USER":
      return { ...state, user: { ...action.payload.user } };

    default:
      return { ...state };
  }
};

export default timeLineReduccer;
