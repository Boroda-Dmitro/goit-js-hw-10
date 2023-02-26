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

const countryList = countries => {
  countries.map(country => console.log(country));
};

refs.input.addEventListener('input', e => {
  fetchCountries(e);
});

`<li class="country-item">
<img class="country-flag" src="" alt="">
<p class="country-name"></p>
</li>`;
