import "@styles/style.scss";

import slider from "./js/slider";

window.addEventListener("DOMContentLoaded", () => {
   "use strict";
   slider(
      ".decisions__slider-item",
      ".decisions__prev-btn",
      ".decisions__next-btn"
   );
});
