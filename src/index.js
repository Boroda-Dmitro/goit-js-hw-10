import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryinfo: document.querySelector('.country-info'),
};
let seachCountry = '';

const creatPage = () => {
  seachCountry = refs.input.value.trim();
  if (seachCountry != '') {
    fetchCountries(seachCountry)
      .then(countriesList => {
        if (countriesList.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          cleanList();
        } else if (countriesList.length === 1) {
          refs.countryinfo.innerHTML = createCountryCard(countriesList[0]);
          refs.countryList.innerHTML = '';
          return;
        } else if (countriesList.length > 1 && countriesList.length < 10) {
          refs.countryList.innerHTML = createCountriesList(countriesList);
          refs.countryinfo.innerHTML = '';
          return;
        } else {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          cleanList();
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    cleanList();
    return;
  }
};

refs.input.addEventListener('input', debounce(creatPage, DEBOUNCE_DELAY));

const createCountriesList = countriesList => {
  return countriesList
    .map(country => {
      return `<li class="country-item">
                <img class="country-flag" src="${country.flags.svg}" alt="flag of ${country.name} ">
                <p class="country-name">${country.name}</p>
              </li>`;
    })
    .join('');
};

const createCountryCard = country => {
  const languages = languageList(country.languages);
  const card = `<h2 class="card-name">
                  <img class="country-flag" src="${country.flags.svg}" alt="flag of ${country.name} "> ${country.name}
                </h2>
                <p class="card-text">Capital: <span class="card-info">${country.capital}</span></p>
                <p class="card-text">Population: <span class="card-info">${country.population}</span></p>
                <p class="card-text">Languages: <span class="card-info">${languages}</span></p>`;

  return card;
};

const languageList = languages => {
  return languages
    .map(language => {
      return language.name;
    })
    .join(', ');
};


const cleanList = () => {
  refs.countryinfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};
