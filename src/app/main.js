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

window.onOpenJobDetail = onOpenJobDetail;
window.onBackClicked = onBackClicked;
window.onRefreshClicked = onRefreshClicked;
window.onViewPassword = onViewPassword;

loadViews();

function loadViews() {
  loginView(loginErrorState());
}
