import emailJs from "@emailjs/browser";
// import "../scss/styles.scss";

// import * as bootstrap from "bootstrap";

const currYearEl = document.querySelectorAll(".current-year");
const currYear = new Date().getFullYear();

currYearEl.forEach((el) => (el.textContent = currYear));

emailJs.init({ publicKey: "07SD-PGGed1yctGgp" });

const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
	e.preventDefault();

	try {
		const res = await emailJs.sendForm(
			"service_6njdcge",
			"template_hk312am",
			this
		);
		console.log(res);
	} catch (err) {
		console.error(err);
	}
});
