window.addEventListener('load', ()=> {
    let long;
    let lat;
    let key; 
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let feelsLike = document.querySelector('.feels-like-text')
    let humidityText = document.querySelector('.enter-humidity')
    let highTemp = document.querySelector('.high-temp')
    let lowTemp = document.querySelector('.low-temp')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            key = "37b4bb1339e09e019b341dfb77aa4c40"

            //const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const { temp} = data.main;
                
                //set DOM elements from the API
                let degreesConvert = Math.round(temp);

                tempDegree.textContent = degreesConvert;
                locationTimeZone.textContent = data.name;
                tempDescription.textContent = data.weather[0].description;
                feelsLike.textContent = Math.round(data.main.feels_like);
                humidityText.textContent = data.main.humidity;
                lowTemp.textContent = Math.round(data.main.temp_min);
                highTemp.textContent = Math.round(data.main.temp_max);
                let iconId = data.weather[0].id;
                var changeClass = [].slice.apply(document.getElementsByClassName("icon"));
                
                if( iconId >= 801 && 803 >= iconId ){
                    for ( var i = 0; i < changeClass.length; i++){
                        changeClass[i].className =changeClass[i].className.replace(/ *\bicon\b/g, "fas fa-cloud-sun"); //801 - 804 icon ids are a little cloudy//
                    }
                } else if(iconId >= 500 && 530 >= iconId){
                    for ( var i = 0; i < changeClass.length; i++){
                        changeClass[i].className =changeClass[i].className.replace(/ *\bicon\b/g, "fas fa-cloud-showers-heavy"); //500-503 icon ids are for raining//
                    }
                }else if(iconId = 804){
                    for ( var i = 0; i < changeClass.length; i++){
                        changeClass[i].className =changeClass[i].className.replace(/ *\bicon\b/g, "fas fa-cloud"); //804 icon ids are cloudy//
                    }
                }else if(iconId = 905){
                    for ( var i = 0; i < changeClass.length; i++){
                        changeClass[i].className =changeClass[i].className.replace(/ *\bicon\b/g, "fas fa-wind"); //905 icon id is for windy//
                    }
                }else if(iconId >= 600 && 602 >= iconId){
                    for ( var i = 0; i < changeClass.length; i++){
                        changeClass[i].className =changeClass[i].className.replace(/ *\bicon\b/g, "fas fa-snowflake"); //905 icon id is for windy//
                    }
                }else if(iconId = 800 ){
                    for ( var i = 0; i < changeClass.length; i++){
                        changeClass[i].className =changeClass[i].className.replace(/ *\bicon\b/g, "fas fa-sun"); //905 icon id is for windy//
                    }

                }else{
                    for ( var i = 0; i < changeClass.length; i++){
                        changeClass[i].className =changeClass[i].className.replace(/ *\bicon\b/g, "fas fa-sun");
                }
            }
            });
            
        });

    }
    
    

});