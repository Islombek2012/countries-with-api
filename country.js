const loading = document.querySelector('.loading')
loading.style.display = 'none';

console.log(window.location);
 
const params = new URLSearchParams(window.location.search)
const countryName = params.get('name')
console.log(countryName);
let URL = 'https://restcountries.com/v3.1/name/'

const countryInfoRow = document.querySelector('.country-info-row')
async function getCountry(link){
      try{
            let req = await fetch(link+countryName)
            let data = await req.json()
            let country = data[0]
            makeCountryItem(country);
      }catch(err){
            alert(err)
      }
}
getCountry(URL)

function makeCountryItem(countryItem){
      console.log(countryItem);
      countryInfoRow.innerHTML = ''
      countryInfoRow.innerHTML = `
            <div class="image">
                              <img src="${countryItem.flags.png}" alt="">
                        </div>
                        <div class="info">
                              // <h1 class="country-info-name">${countryItem.name.common}</h1>
                              <ul class="country-info-list">
                                    <li class="country-info-list__item"><strong>Native Name:</strong> ${countryItem.altSpellings[1]}</li>
                                    <li class="country-info-list__item"><strong>Population:</strong> ${countryItem.population}</li>
                                    <li class="country-info-list__item"><strong>Region:</strong> ${countryItem.region}</li>
                                    <li class="country-info-list__item"><strong>Sub Region:</strong> ${countryItem.subregion}</li>
                                    <li class="country-info-list__item"><strong>Capital:</strong> ${countryItem.capital}</li>
                                    <li class="country-info-list__item"><strong>Top Level Domain:</strong> ${countryItem.tld}</li>
                                    <li class="country-info-list__item"><strong>Currencies:</strong> ${countryItem.currencies.EUR.name}</li>
                                    <li class="country-info-list__item"><strong>Languages:</strong>  ${countryItem.languages.deu} ${countryItem.languages.fra} ${countryItem.languages.ltz}</li>
                              </ul>
                              <div class="borders">
                                    <p class="border-title">Border Countries: </p>
                                    <ul class="border-list">
                                          <li><a href="">${countryItem.borders[0]}</a></li>
                                          <li><a href="">${countryItem.borders[1]}</a></li>
                                          <li><a href="">${countryItem.borders[2]}</a></li>
                                    </ul>
                              </div>
                        </div>

      `
}