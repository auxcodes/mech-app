import {
  onLoginClicked,
  onOpenJobList,
  onOpenJobDetail,
  onBackClicked,
  onRefreshClicked,
  onViewPassword,
} from "./controllers/event-controller.js";
import { loginErrorState } from "./user-auth.js";
import { loginView } from "./controllers/view-controller.js";

window.onLoginClicked = onLoginClicked;
window.onOpenJobList = onOpenJobList;
window.onOpenJobDetail = onOpenJobDetail;
window.onBackClicked = onBackClicked;
window.onRefreshClicked = onRefreshClicked;
window.onViewPassword = onViewPassword;

loadViews();

function loadViews() {
  loginView(loginErrorState());
}
