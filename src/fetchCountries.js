export const fetchCountries = name => {
  fetch(
    `https://restcountries.com/v2/name/${name.currentTarget.value}?fields=name,capital,population,languages.name,flags`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
};
