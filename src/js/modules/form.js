import { postData } from "../services/requests";

const forms = () => {
   const form = document.querySelectorAll("form"),
      inputs = document.querySelectorAll("input");

   const message = {
      loading: "Загрузка",
      success: "Спасибо! Скоро с вами свяжемся",
      failure: "Что-то пошло не так...",
      spinner: "img/spinner.svg",
      ok: "img/ok.svg",
      fail: "img/fail.svg",
   };

   const formClose = () => {
      let popup = document.querySelector(".activePopup");
      popup.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
   };

   const clearInputs = () => {
      inputs.forEach((item) => {
         item.value = "";
      });
   };

   form.forEach((item) => {
      item.addEventListener("submit", (e) => {
         e.preventDefault();

         let statusMessage = document.createElement("div");
         statusMessage.classList.add("status");
         item.parentNode.appendChild(statusMessage);

         item.classList.add("animate__animated", "animate__fadeOutUp");
         setTimeout(() => {
            item.style.display = "none";
         }, 400);

         let statusImg = document.createElement("img");
         statusImg.setAttribute("src", message.spinner);
         statusImg.classList.add("animate__animated", "animate__fadeInUp");
         statusMessage.appendChild(statusImg);

         let textMessage = document.createElement("div");
         setTimeout(() => {
            item.style.display = "none";
         }, 400);
         statusMessage.appendChild(textMessage);

         const formData = new FormData(item);

         postData("server.php", formData)
            .then((res) => {
               console.log(res);
               statusImg.setAttribute("src", message.ok);
               textMessage.textContent = message.success;
            })
            .catch(() => {
               statusImg.setAttribute("src", message.fail);
               textMessage.textContent = message.failure;
            })
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
                  item.style.display = "block";
                  item.classList.remove("animate__fadeOutUp");
                  item.classList.add("animate__fadeInUp");
                  formClose();
               }, 5000);
            });
      });
   });
};

export default forms;
