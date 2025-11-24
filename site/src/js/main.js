import emailJs from "@emailjs/browser";
// import "../scss/styles.scss";

// import * as bootstrap from "bootstrap";

const currYearEl = document.querySelectorAll(".current-year");
const currYear = new Date().getFullYear();

currYearEl.forEach((el) => (el.textContent = currYear));

emailJs.init({ publicKey: "07SD-PGGed1yctGgp" });

const form = document.querySelector("form");

const formSendingFailHtml = `<div class="alert alert-danger">Błąd podczas wysyłania formularza</div>`;
const formSendingSuccesHtml = `<div class="alert alert-success">Formularz został wysłany pomyślnie</div>`;

form.addEventListener("submit", async function (e) {
	e.preventDefault();

	try {
		const res = await emailJs.sendForm(
			"service_6njdcge",
			"template_hk312am",
			this
		);
		console.log(res);
		form.reset();

		form.insertAdjacentHTML("beforebegin", formSendingSuccesHtml);
	} catch (err) {
		console.error(err);
        form.insertAdjacentHTML("beforebegin", formSendingFailHtml);
	}
});
