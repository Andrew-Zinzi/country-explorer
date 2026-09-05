const countrySearchForm = document.getElementById("country-search-form");
const searchInput = document.getElementById("country-search-bar");
const resultGrid = document.getElementById("result-grid");
const modalBackground = document.querySelector(".modal-overlay");
const resultModalBox = document.querySelector(".result-modal-box");
const closeButtons = document.querySelectorAll(".modal-close");

const countryLookup = new Map();

countrySearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(
      `https://countries.dev/name/${searchInput.value}`,
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`Total countries found: ${data.length}`);
      console.log(data);
      resultGrid.innerHTML = "";

      data.forEach((country) => {
        const {
          name,
          flag,
          population,
          capital,
          flags,
          currencies = [],
          alpha2Code,
          languages = [],
        } = country;

        if (!alpha2Code) return;

        countryLookup.set(alpha2Code, country);

        const officialCapital = capital ? capital : "No Capital";
        const svgUrl = flags?.svg;

        const mainCurrency = currencies[0];
        const currencyName = mainCurrency?.name || "Unknown Currency";
        const currencySymbol = mainCurrency?.symbol || "";

        const mainLanguage = languages[0];
        const languageName = mainLanguage?.name || "Unkown Language";

        console.log(`Country: ${flag} ${name}`);
        console.log(
          `Capital: ${officialCapital} | Population: ${population.toLocaleString()}`,
        );
        console.log(`Currency: ${currencyName} (${currencySymbol})`);
        console.log(`Language: ${languageName}`);
        console.log(`Flag Image URL: ${svgUrl}`);
        console.log("-------------------------------");

        resultGrid.innerHTML += `
            <article class="country-result" data-alpha2-code="${alpha2Code}">
                <h1 class="country-result-name">${name}</h1>
                <span class="fi fi-${alpha2Code.toLowerCase()}"></span>
                <button class="open-result-button">Check it out!</button>
            </article>
        `;
      });
    } else {
      throw new Error("Country not Found");
    }
  } catch (error) {
    console.log(error);
  }
});

resultGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("open-result-button")) {
    console.log(
      `Opened ${event.target.closest(".country-result").dataset.alpha2Code} results`,
    );

    const country = countryLookup.get(
      event.target.closest(".country-result").dataset.alpha2Code,
    );
    console.log(country);

    const {
      name,
      flag,
      population,
      capital,
      flags,
      currencies = [],
      alpha2Code,
      languages = [],
    } = country;

    //data variable
    const officialCapital = capital ? capital : "No Capital";
    const svgUrl = flags?.svg;
    const mainCurrency = currencies[0];
    const currencyName = mainCurrency?.name || "Unknown Currency";
    const currencySymbol = mainCurrency?.symbol || "";
    const mainLanguage = languages[0];
    const languageName = mainLanguage?.name || "Unkown Language";

    //result box references
    const resultName = document.querySelector(".result-modal-box-name");
    const resultFlag = document.querySelector(".result-modal-box-flag");
    const resultCapital = document.querySelector(".result-modal-box-capital");
    const resultPopulation = document.querySelector(
      ".result-modal-box-population",
    );
    const resultCurrency = document.querySelector(".result-modal-box-currency");
    const resultLanguage = document.querySelector(".result-modal-box-language");

    resultName.textContent = name;
    resultFlag.className = `result-modal-box-flag fi fi-${alpha2Code.toLowerCase()}`;
    resultCapital.textContent = officialCapital;
    resultPopulation.textContent = population.toLocaleString();
    resultCurrency.textContent = `Currency: ${currencyName} (${currencySymbol})`;
    resultLanguage.textContent = languageName;

    modalBackground.classList.add("active");
    resultModalBox.classList.add("active");
  }
});

resultModalBox.addEventListener("click", (event) => {
  if (event.target.closest(".modal-close")) {
    console.log("close modal");

    modalBackground.classList.remove("active");
    resultModalBox.classList.remove("active");
  }
});
