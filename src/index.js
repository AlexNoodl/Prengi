import "@styles/style.scss";

import renderHtml from "./js/render";
import slider from "./js/slider";

window.addEventListener("DOMContentLoaded", () => {
   "use strict";
   renderHtml();
   slider(
      ".decisions__slider-item",
      ".decisions__prev-btn",
      ".decisions__next-btn"
   );
});
