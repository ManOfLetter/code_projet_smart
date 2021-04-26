var callBackGetSuccess = function (data) {

console.log(data);
for (var i = 0; i <= 6; i++) 
    {
    forecastDay(document.getElementById("tempmin"+i),document.getElementById("tempmax"+i),document.getElementById("windspeed"+i), document.getElementById("date"+i), data.days[i].datetime, data.days[i].tempmax, data.days[i].tempmin, data.days[i].tempmax, data.days[i].windspeed );
        iconWeather("image"+i, data.days[i].icon);
        //iconMoon("moon"+i, data.days[i].moonphase);
    }
}

function buttonClickGET() {
    var loc = document.getElementById("queryLoc").value;
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
    var moonToDisplay = moonphase*100;
    var numberofthemoon =1;
    var x=0;
    console.log(moonToDisplay)

    for (x; x <= 100; x = x+4) {
        
        if(moonToDisplay >= x && moonToDisplay < x+4)
        {
            console.log("dans if :"+numberofthemoon)
            document.getElementById(imageToDisplay).setAttribute('src', "icon/moon/"+numberofthemoon+".png");
            console.log("icon/moon/"+numberofthemoon+".png")
            break;
        }
        else
        {
            console.log("dans else :"+numberofthemoon)
            numberofthemoon++
        }
    }
}

function forecastDay(TempMinToDisplay,TempMaxToDisplay,WindSpeedToDisplay, DateDayMonth, DateTime, TempMax, TempMin, WindSpeed){   
    var str = DateTime
    var day = str.substring(8, 10);
    var month = str.substring(5, 7);
    DateDayMonth.innerHTML = day + "/" + month
    TempMinToDisplay.innerHTML = "Temp Max " + TempMax + "°C"
    TempMaxToDisplay.innerHTML = "Temp Min " + TempMin + "°C"
    WindSpeedToDisplay.innerHTML = "Vent " + WindSpeed + " km/h"
}

function dateHeure(){
    var ladate=new Date()
    var DH = document.getElementById("dateHeure");
    DH.innerhtml = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
    console.log
}