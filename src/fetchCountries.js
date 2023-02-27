export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v2/name/${name.currentTarget.value}?fields=name,capital,population,languages.name,flags`
  ).then(response => {
    return response.json();
  });
};
