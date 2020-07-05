import header from "@header/header.html";
import main from "@blocks/main/main.html";
import withPrengi from "@blocks/withPrengi/withPrengi.html";
import decisions from "@blocks/decisions/decisions.html";
import advantages from "@blocks/advantages/advantages.html";
import variants from "@blocks/variants/variants.html";
import proceed from "@blocks/proceed/proceed.html";
import footer from "@footer/footer.html";

const renderHtml = () =>
   (document.getElementById(
      "root"
   ).innerHTML = `${header} ${main} ${withPrengi} ${decisions} ${advantages} ${variants} ${proceed} ${footer}`);

export default renderHtml;
