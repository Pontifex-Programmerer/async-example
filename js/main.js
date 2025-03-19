const asyncBtn = document.querySelector('#async');
const syncBtn = document.querySelector('#sync');
const searchField = document.querySelector('#name-search');
const popupRemBtn = document.querySelector('#remove-popup');

popupRemBtn.addEventListener('click', e => {
    togglePopup();
});

asyncBtn.addEventListener('click', e => {
    e.preventDefault();
    console.info('Initiating async systemcall...');
});

syncBtn.addEventListener('click', e => {
    e.preventDefault();
    console.info('Initiating synchronous systemcall...');
    const name = searchField.value;
    if(name.length > 0) {

        toggleLoading();
        
        // Hack / workaround. This is needed because the script executes faster than the rendering of the UI,
        // so therefor the graphical updates from toggleloading is blocked by the blocking script.
        setTimeout(()=>{
            const timePassed = blockAndConsumeTime(generateRandomMilliseconds());
            console.log('search took', timePassed, 'seconds');
            const result = getRandomResult(name);
            togglePopup(result);
            searchField.value="";
            toggleLoading();
        }, 10);
    } else {
        console.warn('There is noone to search for!')
    }

});


//returns a random integer between 5.000 and 10.000
function generateRandomMilliseconds(){
    return Math.round(Math.random()*5000)+5000;
}

function blockAndConsumeTime(time){
    if(time > 1000) {
        time = Math.round(time/1000);
    } else if(time> 30) {
        time=30;
    }
    const start = Date.now();
    let secondsPassed = 0;
    let trackedSecond = -1;
    do {
        secondsPassed = Math.round((Date.now() - start)/1000);
        if(secondsPassed !== trackedSecond) {
            console.log(secondsPassed);
            trackedSecond=secondsPassed;
            if(secondsPassed%2==0){
                console.log('tic');
            } else {
                console.log('toc');
            }
        }

    }while(secondsPassed < time);

    return secondsPassed;
}

function toggleLoading() {
    const searchText = 'Searching...';
    const statusText = 'Search for:';
    const loaderDots = document.querySelector('#loader-dots');
    const labelForInput = document.querySelector('label[for="input"]');

    if(labelForInput.innerText == searchText) labelForInput.innerText = statusText;
    else labelForInput.innerText = searchText; 
    console.log(labelForInput.innerText)
    loaderDots.classList.toggle('loader-dots');
}

function togglePopup(result){
    const popup = document.querySelector('#popup');
    popup.classList.toggle('invisible');
    const popupresult = document.querySelector('#popup-result');

    if(typeof result !== 'undefined') {
        popupresult.innerText=result;
    } else {
        // clear content when removing the popup or result is undefined
        popupresult.innerText='';
    }
}

function getRandomResult(name) {
    const cities = [
        "Lagos, Nigeria",
        "Cape Town, South Africa",
        "Nairobi, Kenya",
        "Casablanca, Morocco",
        "Addis Ababa, Ethiopia",
        "Accra, Ghana",
        "Dakar, Senegal",
        "New York City, USA",
        "Toronto, Canada",
        "Mexico City, Mexico",
        "Havana, Cuba",
        "Guatemala City, Guatemala",
        "San José, Costa Rica",
        "Panama City, Panama",
        "Buenos Aires, Argentina",
        "São Paulo, Brazil",
        "Santiago, Chile",
        "Lima, Peru",
        "Bogotá, Colombia",
        "Montevideo, Uruguay",
        "La Paz, Bolivia",
        "Tokyo, Japan",
        "Beijing, China",
        "Bangkok, Thailand",
        "Mumbai, India",
        "Seoul, South Korea",
        "Jakarta, Indonesia",
        "Manila, Philippines",
        "London, United Kingdom",
        "Paris, France",
        "Rome, Italy",
        "Berlin, Germany",
        "Oslo, Norway",
        "Madrid, Spain",
        "Prague, Czech Republic",
        "Istanbul, Turkey",
        "Dubai, UAE",
        "Riyadh, Saudi Arabia",
        "Tehran, Iran",
        "Jerusalem, Israel",
        "Sydney, Australia",
        "Auckland, New Zealand",
        "Suva, Fiji",
        "Port Moresby, Papua New Guinea",
        "Apia, Samoa",
        "McMurdo Station, Antarctica",
        "Esperanza Base, Antarctica",
        "Amundsen-Scott South Pole Station, Antarctica",
        "Scott Base, Antarctica",
        "Rothera Research Station, Antarctica"
    ];
    
    const professions = [
        "Software Developer",
        "Neurosurgeon",
        "Mechanical Engineer",
        "Astrophysicist",
        "Forensic Scientist",
        "Ethical Hacker",
        "Cryptographer",
        "Robotics Engineer",
        "Marine Biologist",
        "Game Designer",
        "Professional Mermaid",
        "Sommelier (Wine Expert)",
        "Tea Taster",
        "Foley Artist (Sound Effects Creator)",
        "Toy Designer",
        "Food Stylist",
        "Luxury Watchmaker",
        "Mathematician",
        "Archaeologist",
        "Stunt Performer",
        "Professional Whistler",
        "Iceberg Mover",
        "Bike Courier",
        "Blacksmith",
        "Beekeeper",
        "Lighthouse Keeper",
        "Dog Psychologist",
        "Snake Milker (Venom Extractor)",
        "Horologist (Clockmaker)",
        "Astronaut",
        "Deep Sea Diver",
        "Train Driver",
        "Museum Curator",
        "Perfumer (Fragrance Expert)",
        "Zookeeper",
        "Voice Actor",
        "Telescope Operator",
        "Bonsai Tree Cultivator",
        "Luthier (Guitar Maker)",
        "Bounty Hunter",
        "Theme Park Designer",
        "Taxidermist",
        "Espresso Machine Technician",
        "Toy Tester",
        "Professional Sleeper (Sleep Study Participant)",
        "Water Slide Tester",
        "Ethnomusicologist",
        "UFO Researcher",
        "Puppeteer",
        "Storm Chaser"
    ];

    const resultProf = professions[Math.floor(Math.random()*professions.length)];
    const resultCity = cities[Math.floor(Math.random()*cities.length)];

    return `${name} is a ${resultProf} living in ${resultCity}`
}