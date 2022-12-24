import { combineReducers } from "redux";
import auth from "./Auth";
import timeLineReduccer from "./timelineReduccer";
import UserConversation from "./UserConversation";
import socketReduccer from "./Socket";
import ActiveUsers from "./ActiveUsers";
import notifyReduccer from "./NotifyReduccer";
import Story from "./Story";
import suggistion from "./Suggistion";
export const reduccers = combineReducers({
  auth,
  timeLineReduccer,
  UserConversation,
  socketReduccer,
  ActiveUsers,
  notify: notifyReduccer,
  stories: Story,
  Suggistion: suggistion,
});
