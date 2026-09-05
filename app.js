const countrySearchForm = document.getElementById("country-search-form");
const searchInput = document.getElementById("country-search-bar");
const resultGrid = document.getElementById("result-grid");

countrySearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(
      `https://countries.dev/name/${searchInput.value}`,
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`Total countries found: ${data.length}`);

      data.forEach((country) => {
        const {
          name,
          flag,
          population,
          capital,
          flags,
          currencies = [],
        } = country;

        const officialCapital = capital ? capital : "No Capital";
        const pngUrl = flags?.png;

        const mainCurrency = currencies[0];
        const currencyName = mainCurrency?.name || "Unknown Currency";
        const currencySymbol = mainCurrency?.symbol || "";

        console.log(`Country: ${flag} ${name}`);
        console.log(
          `Capital: ${officialCapital} | Population: ${population.toLocaleString()}`,
        );
        console.log(`Currency: ${currencyName} (${currencySymbol})`);
        console.log(`Flag Image URL: ${pngUrl}`);
        console.log("-------------------------------");
      });
    } else {
      throw new Error("Country not Found");
    }
  } catch (error) {
    console.log(error);
  }
});
