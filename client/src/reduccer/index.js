import { combineReducers } from "redux";
import auth from "./Auth";
import timeLineReduccer from "./timelineReduccer";
import UserConversation from "./UserConversation";
import socketReduccer from "./Socket";
import ActiveUsers from "./ActiveUsers";
import notifyReduccer from "./NotifyReduccer";
import Story from "./Story";
import suggistion from "./Suggistion";
import messages from "./Messages";
export const reduccers = combineReducers({
  auth,
  timeLineReduccer,
  UserConversations: UserConversation,
  socketReduccer,
  ActiveUsers,
  notify: notifyReduccer,
  stories: Story,
  Suggistion: suggistion,
  Messages: messages,
});
