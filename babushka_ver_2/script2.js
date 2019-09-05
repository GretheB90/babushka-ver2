		//Lager verdiene:
		let menu;
		const dest = document.querySelector("#liste");
		const temp = document.querySelector("template");

		//definerer kategoriene fra menyen:
		let filterMat = "alle";


		document.addEventListener("DOMContentLoaded", getJson);

		//henter Json filen fra nettsiden:
		async function getJson() {
			let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
			menu = await jsonData.json();
			visMenu();
			addEventListnersToButtons();
		}

		//får informasjonen til å vises på siden:
		function visMenu() {
			dest.innerHTML = "";
			menu.feed.entry.forEach((menu) => {
				if (filterMat == "alle" || filterMat == menu.gsx$kategori.$t) {
					const klon = temp.cloneNode(true).content;

					//klon.querySelector("p").textContent = menu.gsx$navn.$t; //denne endrer at det som er inni p taggen blir vist. tidligere sto det h3

					//Dette får elementene fra listen man har importert til å fysisk //klon.querySelector(".kategori").textContent = menu.gsx$kategori.$t;
					klon.querySelector(".navn").textContent = menu.gsx$navn.$t; //sjekk denne om den gjør noe fuck
					klon.querySelector(".kort").textContent = menu.gsx$kort.$t;
					klon.querySelector(".pris").textContent = `${menu.gsx$pris.$t} Kroner`;
					klon.querySelector("img").src = `images/small/${menu.gsx$billede.$t}-sm.jpg`;

					dest.appendChild(klon);

					dest.lastElementChild.addEventListener("click", () => {
						location.href = `single.html?menuItem=${menu.gsx$id.$t}`; //ny kode
					});
				}

			});
		}

		//filteringsystemet:
		function addEventListnersToButtons() {
			document.querySelectorAll(".filter").forEach(elm => {
				elm.addEventListener("click", filtering);
			})
		}

		function filtering() {
			filterMat = this.getAttribute("data-mat");
			document.querySelector("h2").textContent = this.textContent;
			document.querySelectorAll(".filter").forEach(elm => {
				elm.classList.remove("valgt");
			});
			this.classList.add("valgt");
			visMenu();
		}