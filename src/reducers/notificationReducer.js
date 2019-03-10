const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const changeNotification = (notification, timeoutSecs = 5) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: ""
      });
    }, timeoutSecs * 1000);
    dispatch({
      type: "SET_NOTIFICATION",
      notification
    });
  };
};

export default notificationReducer;
