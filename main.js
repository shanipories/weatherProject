const API_KEY = '8ee633956bad6ae1965b557a94ecfcba';

const newYork = "New York"

const urls = [
    `https://api.openweathermap.org/data/2.5/weather?q=Eilat&units=metric&lang=he&appid=${API_KEY}`,
    `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=he&appid=${API_KEY}`,
    `https://api.openweathermap.org/data/2.5/weather?q=Alaska&units=metric&lang=he&appid=${API_KEY}`,
    `https://api.openweathermap.org/data/2.5/weather?q=${newYork}&units=metric&lang=he&appid=${API_KEY}`
];

const icons = [
    "fa fa-bolt",
    "fa fa-cloud",
    "fa fa-sun-o"
];

const tryContainer = document.querySelector(".tryContainer");
tryContainer.innerHTML = ``;

const cards = []

const createCard = (data) => {
    const colEl = document.createElement("div");
    colEl.className = "col-md-4 p-5 m-1";
    const cardEl = document.createElement("div");
    cardEl.className = "card p-3 shadow";
    cardEl.innerHTML = `
    <div>
        <div class="theHead d-flex" dir="rtl">
            <div class="nameAndDescription">
                  <h2 class="fw-bold" dir="rtl">${data.name}</h2>
                  <h6 class="fw-light text-body-tertiary" dir="rtl">${data.weather[0].description}</h6>
            </div>
           <i class="${chooseIcon(data)} w-100 d-flex justify-content-end" aria-hidden="true"></i>
        </div>
        <br>
        <div class="d-flex" dir="rtl">
            <div class="small text-center">
                  <h6>טמפ' נמדדת</h6>
                  <h3 dir="ltr">${Math.floor(data.main.temp)}&deg;C</h3>
            </div>
            <div class="small text-center">
                  <h6>טמפ' מורגשת</h6>
                  <h3 dir="ltr">${Math.floor(data.main.feels_like)}&deg;C</h3>
            </div>
            <div class="small text-center">
                  <h6>לחות</h6>
                  <h3>${data.main.humidity}%</h3>
            </div>
        </div>
    </div>
    `;

    colEl.append(cardEl);
    return colEl;
};

const addEl = (holder, content) => {
    holder.append(content);
}

const fetchApiAxios = async (url) => {
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return res.data;
};

const getData = async () => {
    for (let i = 0; i < urls.length; i++) {
        const data = await fetchApiAxios(urls[i]);
        cards.push(createCard(data))
    }
    render()
};

const chooseIcon = (data) => {
    if (data.main.feels_like <= 20)
        return icons[0]
    else if (data.main.feels_like > 20 && data.main.feels_like < 30)
        return icons[1]
    else
        return icons[2]
}

const render = () => {
    for (let i = 0; i < cards.length; i++) {
        addEl(tryContainer, cards[i]);
    }
};

getData();



