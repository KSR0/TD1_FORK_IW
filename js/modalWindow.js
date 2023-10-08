document.addEventListener("DOMContentLoaded", function () {

    const modalWindowBtn = document.querySelector("#modalWindowBtn");
    const modalWindowCloseBtn = document.querySelector("#close");
    const dropDownCard = document.querySelector("#dropDownCard");
    let modalWindow = document.querySelector("#modalWindow");
    
    //let modalWindowContent = document.querySelector("#modalWindowContent");


    // Afficher la modale si on clique sur la roue dentee
    modalWindowBtn.addEventListener("click", function () {
        modalWindow.style.display = "block";
    });

    let latitudeState;
    let longitudeState;
    let rainState;
    let windSpeedState;
    let windAngleState;
    // Permet de savoir ce que l'utilisateur veut voir
    function checkOptionsSelected() {
        latitudeState = document.querySelector("#latitude_checkbox").checked;
        longitudeState = document.querySelector("#longitude_checkbox").checked;
        rainState = document.querySelector("#rain_quantity_checkbox").checked;
        windSpeedState = document.querySelector("#wind_speed_checkbox").checked;
        windAngleState = document.querySelector("#wind_angle_checkbox").checked;
        //console.log(latitudeState, longitudeState, rainState, windSpeedState,windAngleState);
    }


    let cityInsee;
    let cmpt = 0;
    function displayWeatherInformations() {
        for (let i = 0; i < dropDownCard.children.length - 1; i++) {
            if (i%2 == 0) {
                for (let j = 0; j < dropDownCard.children[i].children.length; j++) {
                    if (dropDownCard.children[i].children[j].className == "customized_weather_informations") {
                        dropDownCard.children[i].children[j].innerHTML = "";
                    }
                }
            }
        }
        cityInsee = document.querySelector("#city_select").value;
        
        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=52ebc4fdc1af7f1041b873d5f7c3140eaa23454977b3519f5f1110a3a8176c48&insee=${cityInsee}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        
        .then(data => {
            
            for (let i = 0; i < dropDownCard.children.length - 1; i++) {
                if (i%2 == 0) {
                    for (let j = 0; j < dropDownCard.children[i].children.length; j++) {
                        if (dropDownCard.children[i].children[j].className == "customized_weather_informations") {
                            if (latitudeState) {
                                dropDownCard.children[i].children[j].innerHTML += `Latitude décimale de la commune : ${data.forecast[cmpt].latitude}</br>`;
                            }
                            if (longitudeState) {
                                dropDownCard.children[i].children[j].innerHTML += `Longitude décimale de la commune : ${data.forecast[cmpt].longitude}</br>`;
                            }
                            if (rainState) {
                                dropDownCard.children[i].children[j].innerHTML += `Cumul de pluie sur la journée : ${data.forecast[cmpt].rr1}mm</br>`;
                            }
                            if (windSpeedState) {
                                dropDownCard.children[i].children[j].innerHTML += `Vent moyen à 10 mètres : ${data.forecast[cmpt].wind10m}km/h</br>`;
                            }
                            if (windAngleState) {
                                dropDownCard.children[i].children[j].innerHTML += `Direction du vent en degrés (0 à 360°) : ${data.forecast[cmpt].dirwind10m}°</br>`;
                            }
                            cmpt++;
                        }
                    }
                    
                }
                
            }
            cmpt = 0;
        })
        
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        });
    }
    

    // Fermer la modale si on clique sur la croix
    modalWindowCloseBtn.addEventListener("click", function() {
        modalWindow.style.display = "none";
        checkOptionsSelected();
        displayWeatherInformations();
    });

    // Si on clique sur l'arriere plan, la modale disparait
    window.onclick = function(event) {
        if (event.target == modalWindow) {
            modalWindow.style.display = "none";
        }
        if (event.target == modalWindow && modalWindow.style.display == "none") {
            checkOptionsSelected();
            displayWeatherInformations();
        }
        
    };

});

