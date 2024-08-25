let API = 'https://restcountries.com/v3.1/';
const countriesRow = document.querySelector('.countries-row')
const loading = document.querySelector('.loading')
loading.style.display = 'block';
async function sendRequest(link){
      try{
            let res = await fetch(API + link)
            if(!res.ok){
                  document.querySelector('.error-page').textContent = res.status
                  throw new Error(res.status)
            }
            let data = await res.json()
            makeCountry(data)
      }catch(error){
            console.log(error.message);
      }
}


sendRequest('all')
async function makeCountry(countries){
      loading.style.display = 'none';


      countriesRow.innerHTML = ''
      countries.forEach(country => {
            let capitalCountry
            capitalCountry = country.capital ? country.capital.join(' / ') : '<span style="color: red;">No Capital</span>';
            let a = document.createElement('a')
            a.classList.add('country')
            a.href = `./country.html?name=${country.name.common}`
            a.innerHTML = `
                  <img class="country-img" src="${country.flags.png}" alt="">
                  <div class="info">
                        <h1 class="country-title">${country.name.common}</h1>
                        <ul class="country-list">
                              <li class="country-list-item">Population: <span>${country.population}</span></li>
                              <li class="country-list-item">Region: <span>${country.region}</span></li>
                              <li class="country-list-item">Capital: <span>${capitalCountry}</span></li>
                        </ul>
                  </div>
            `
            countriesRow.appendChild(a)
      });
      
}

const select = document.querySelector('.select')
select.addEventListener('change', ()=>{
      
      if(select.value == 'all'){
            sendRequest('all')
      }else{
            sendRequest(`region/${select.value}`)      
      }
})
const searchInput = document.querySelector('.search-input')
searchInput.addEventListener('input', ()=>{
      console.log(searchInput.value);
      let value = searchInput.value.trim()
      if(value){
            sendRequest(`name/${value}`)
      }else{
            sendRequest('all')
      }
}) 