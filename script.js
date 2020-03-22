const formSeacrh = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    inputDataDepart = document.querySelector('.input__date-depart');
const citiesApi  = 'db/cities.json',
    api_key = '639192ec333d3f89a677378365548dee',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload';
let city = [];
const showCity = (input, list) => {
    list.textContent = '';
    if(input.value === '') return;
        const filterCity = city.filter((item) => {
                const fixItem = item.name.toLowerCase();
                return fixItem.includes(input.value.toLowerCase());
        });
        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li);
        });
};
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});
inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
});
const selectCity = (input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent = '';
    }
};
dropdownCitiesFrom.addEventListener('click', () => {
    selectCity(inputCitiesFrom, dropdownCitiesFrom)
});
dropdownCitiesTo.addEventListener('click', () => {
    selectCity(inputCitiesTo, dropdownCitiesTo)
});
const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status == 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
    });
    request.send();
};
getData(citiesApi, data => {
	city = JSON.parse(data).filter(item => item.name);
});