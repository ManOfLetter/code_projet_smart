var callBackGetSuccess = function (data) {

console.log(data);
for (let i = 0; i <= 6; i++) 
    {
    forecastDay(document.getElementById("temp"+i), document.getElementById("date"+i), data.days[i].datetime, data.days[i].temp);
        iconWeather("image"+i, data.days[i].icon);
        //iconMoon("moon"+i, data.days[i].moonphase);
    }
}

function buttonClickGET() {
    let loc = document.getElementById("queryLoc").value;
    var url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + loc + "?unitGroup=metric&key=R3CLVF6WWG8ZHAY2Z38T8NIUW&include=fcst%2Ccurrent"

    $.get(url, callBackGetSuccess).done(function () {

    })
        .fail(function () {
            alert("error");
        })
        .always(function () {
        });
}

function iconWeather(imageToChange, iconToPut) {
    switch (iconToPut) {
        case "partly-cloudy-day":
            document.getElementById(imageToChange).setAttribute('src', "icon/partly-cloudy-day.svg");
            break;
        case 'clear-day':
            document.getElementById(imageToChange).setAttribute('src', "icon/clear-day.svg");
            break;
        case 'snow':
            document.getElementById(imageToChange).setAttribute('src', "icon/snow.svg");
            break;
        case 'rain':
            document.getElementById(imageToChange).setAttribute('src', "icon/rain.svg");
            break;
        case 'fog':
            document.getElementById(imageToChange).setAttribute('src', "icon/fog.svg");
            break;
        case 'wind':
            document.getElementById(imageToChange).setAttribute('src', "icon/wind.svg");
            break;
        case 'cloudy':
            document.getElementById(imageToChange).setAttribute('src', "icon/cloudy.svg");
            break;
        default:
            console.log(`Pas d'icone a afficher`);
    }
}
function iconMoon(imageToDisplay, moonphase){
    
    for (let y = 0; y <= 10; y++) {
        let moonToDisplay = 0;
     

        
    }
    switch (moonphase) {
        case "1":
            document.getElementById(imageToDisplay).setAttribute('src', "icon/1.png");
            break;
        default:
            console.log(`Pas d'icone a afficher`);
    }
}

function forecastDay(TempToDisplay, DateDayMonth, DateTime, Temp){   
    let temp = TempToDisplay;
    let date = DateDayMonth;
    let str = DateTime
    let day = str.substring(8, 10);
    let month = str.substring(5, 7);
    DateDayMonth.innerHTML = day + "/" + month
    TempToDisplay.innerHTML = Temp + "°C"
}

function dateHeure(){
    var ladate=new Date()
    let DH = document.getElementById("dateHeure");
    DH.innerhtml = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
    console.log
}