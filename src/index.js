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
        } else if (countriesList.length > 1 && countriesList.length < 10) {
          refs.countryList.innerHTML = createCountriesList(countriesList);
          refs.countryinfo.innerHTML = '';
          return;
        } else  {
          refs.countryinfo.innerHTML = createCountryCard(countriesList[0]);
          refs.countryList.innerHTML = '';
          return;
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        cleanList();
      });
  } else {
    cleanList();
    return;
  }
};

refs.input.addEventListener('input', debounce(creatPage, DEBOUNCE_DELAY));

const createCountriesList = countriesList => {
  console.log(countriesList);
  return countriesList
    .map(({ name, flags }) => {
      return `<li class="country-item">
                <img class="country-flag" src="${flags.svg}" alt="${flags.alt}" width="25" height="15">
                <p class="country-name">${name.common}</p>
              </li>`;
    })
    .join('');
};

const createCountryCard = ({ name, flags, capital, population, languages }) => {
  const languagesList = getLanguages(languages);
  const card = `<h2 class="card-name">
                  <img class="country-flag" src="${flags.svg}" alt="${flags.alt}" width="25" height="15"> ${name.common}
                </h2>
                <p class="card-text">Capital: <span class="card-info">${capital}</span></p>
                <p class="card-text">Population: <span class="card-info">${population}</span></p>
                <p class="card-text">Languages: <span class="card-info">${languagesList}</span></p>`;

  return card;
};

const getLanguages = languages => {
  return Object.values(languages).join(', ');
};

const cleanList = () => {
  refs.countryinfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};
