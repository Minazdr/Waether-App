
// listeners
listeners()

function listeners() {
          document.querySelector('#submitBtn').addEventListener('click', search)
}


// Function

function search(e){
    e.preventDefault()


    const city = document.querySelector('#city').value
    
    if (city === '') {
        // ui.printMessage('Please, Fill in at least one of the fields', 'alert ')
        alert('Please, Fill in input the fields')
    }

    if (city !== '') {
        cityAPI.queryAPI(city)
        .then(selectCity => {
        
            // Accsess to information Weather City
            const main = selectCity.cityJson.weather[0].main;
            const temp = selectCity.cityJson.main.temp;
            const temp_min = selectCity.cityJson.main.temp_min;
            const temp_max = selectCity.cityJson.main.temp_max;
            const humidity = selectCity.cityJson.main.humidity;
            const country = selectCity.cityJson.sys.country;
            const deg = selectCity.cityJson.wind.deg;
            const speed = selectCity.cityJson.wind.speed;
           
            console.log(temp);
            // Show Now Day
            let current = new Date();
            console.log(current.getFullYear());
            console.log(current.getUTCHours());
            let today = current.toLocaleDateString('en-US',{weekday: 'long'});
            console.log(today);

            // Show clock
            var span = document.querySelector('.hour');

            function time() {
                var d = new Date();
                var s = d.getSeconds();
                var m = d.getMinutes();
                var h = d.getHours();
                span.textContent = 
                ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
            }     
            console.log(time());  
            
            function getTemp(temp){
                const k = temp;
                // const f = (k - 273.15) * 9/5 + 32;
                const c = k - 273;
                const m = Math.round(c)
                // return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
                return m;
            }

            let tempName = getTemp(temp)
console.log(tempName);
            
            function getIcon(main){
                let icon;
                switch (main) {
                    case 'Clear':
                        icon = `${main}.svg`;
                        break;

                    case 'Clouds':
                        icon = `${main}.svg`;
                        break;

                    case 'Rain':
                        icon = `${main}.svg`;
                        break;

                    case 'Snow':
                        icon = `${main}.svg`;
                        break;
        }
        return icon;
}


    let iconName = getIcon(main)


    if (main !== '' || tempName !== '' || temp_min !== '' || temp_max !== '' || humidity !== '' || country !== '' || deg !== '' || speed !== '' || city !== ''|| today !== ''  || iconName !=='' ) {
            console.log(ui.getTemp(temp));
            ui.showNews(main, tempName, temp_min, temp_max, humidity, country, deg, speed, city, today, iconName)
                } else {
                        alert('here is no news')
                    }
        }) 
    }
}

class UI {

    constructor(){
        this.result = document.querySelector('.result');
    }

         // show any message in HTML
    printMessage(message, className) {

        // craete  div element
        const div = document.createElement('div')
        // append text message to the div tag
        div.appendChild(document.createTextNode(message))
        div.className = className


            // show to message into the HTML
            document.querySelector('.message').appendChild(div)

            setTimeout(() => {
                      this.removeMessage()
            
            }, 3000);
  }

    // remove message 

    removeMessage() {
            const alert = document.querySelector('.alert')
            if (alert) {
                      alert.remove()
            }
    }

    
    
   

    getTemp(temp) {
        temp = parseFloat(temp);
        document.querySelector(".temp").value = (temp-32) / 1.8;
        //document.getElementById("outputFahrenheit").value = (valNum*1.8)+32;
    }

    getTemp(temp) {
        const k = temp
        const c = k - 273.15;
        return temp = {kel:Math.floor(c)};  
    }

    showNews(main, tempName, temp_min, temp_max, humidity, country, deg, speed, city, today, iconName){
console.log(tempName);
        document.querySelector('.result').style.display = "block"
        this.result.innerHTML += `
        <h5 class="day-re">${today}</h5>
        <img src='img/${iconName}' class="img-re"/>
        <h2 class="temp-re">${tempName}°</h2>
        <h2 class="city-re">${city}</span></h2>
        <div class="div-re">
        <img src="https://img.icons8.com/small/16/000000/wind.png" class="icon-re"/><span class="span-re">${speed} km/h</span><br>
        <img src="https://img.icons8.com/small/16/000000/wet.png" class="icon-re"/><span class="span-re">${humidity} %</span>
        </div>

        `
        
    }
}

const ui = new UI;


class News {

          APIkey = '601a4b8fbba144d070c3117fe902f7d8'

          async queryAPI(city) {
                    let url = 'https://api.openweathermap.org/data/2.5/weather?'


                    if (city !== '') {
                              url += `q=${city}&`
                    }


                    url += `appid=${this.APIkey}`

                    console.log(url);

                    const cityResponse = await fetch(url)
                    const cityJson = await cityResponse.json()

                    return{
                        cityJson
                    }
          }
}

const cityAPI = new News;