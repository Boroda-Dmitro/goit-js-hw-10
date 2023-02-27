import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryinfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', e => {
  fetchCountries(e).then(countriesList => {
    console.log(countriesList);
    if (countriesList.length === 1) {
      refs.countryinfo.innerHTML = createCountryCard(countriesList[0]);
      refs.countryList.innerHTML = '';
      return;
    }
    if (countriesList.length > 1 && countriesList.length < 10) {
      refs.countryList.innerHTML = createCountriesList(countriesList);
      refs.countryinfo.innerHTML = '';
      return;
    } else return;
  });
});

const createCountriesList = countriesList => {
  return countriesList
    .map(country => {
      return `<li class="country-item">
<img class="country-flag" src="${country.flags.svg}" alt="${country.name} flag">
<p class="country-name">${country.name}</p>
</li>`;
    })
    .join('');
};

const createCountryCard = country => {
  const card = `<h2 class="card-name">
      <img class="country-flag" src="${country.flags.svg}" alt="${country.name} flag"> ${country.name}
    </h2>
    <p class="cardText">Capital: <span class="card-info">${country.capital}</span></p>
    <p class="cardText">Population: <span class="card-info">${country.population}</span></p>
    <p class="cardText">Languages: <span class="card-info">${country.languages}</span></p>`;

  return card;
};
