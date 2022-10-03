const searchform = document.querySelector('#searchForm');
const input = document.querySelector('#search_weather');
searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = input.value;
    fetch(`/weather?address=${loc}`).then(async (response) => {
        const data = (await response.json());
        document.getElementById('forecast').innerText = data.forecast
        document.getElementById('location').innerText = data.location
    });
});