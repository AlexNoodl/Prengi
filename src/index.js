import "@styles/style.scss";

import slider from "./js/modules/slider";
import modals from "./js/modules/modals";
import mask from "./js/modules/mask";
import form from "./js/modules/form";
import checkTextInputs from "./js/modules/checkTextInputs";
import checkMailInputs from "./js/modules/checkMailInputs";

window.addEventListener("DOMContentLoaded", () => {
   "use strict";
   slider(
      ".decisions__slider-item",
      ".decisions__prev-btn",
      ".decisions__next-btn"
   );
   modals();
   mask('[name="phone"]');
   checkTextInputs('[name="name"]');
   checkMailInputs('[name="email"]');
   form();
});
