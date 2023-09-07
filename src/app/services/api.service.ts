import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  weatherData$ = new Subject<any>();

  constructor(private http: HttpClient, private geolocation: Geolocation) { }


    
    

  temperature:number;

  async getUserLocation() {
    const position=await this.geolocation.getCurrentPosition();/* .then(position => {
      // Obtener la latitud y longitud del usuario
      
      // Hacer una solicitud a la API de clima con la latitud y longitud
      //this.getWeatherData(lat, lng);
    }); */
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(position.coords.latitude);

    const a = await this.getClima(lat, lng);
    console.log(a);

    return [lat,lng];
  }

  
  getClima(lat, lng): Promise<any>{
    const API_KEY = '';
    const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
    return new Promise ((resolve, reject)=>{
      this.http.get(API_ENDPOINT).subscribe(

        data=>resolve(data),
        err=>reject(err)

      );      
    });
  }


  // Hacer una solicitud a la API de clima con la latitud y longitud
  async getWeatherData() {
    const [lat, lng]= await this.getUserLocation();
    const data_clima= await this.getClima(lat, lng);
    console.log(data_clima);
    return {temp_max: (data_clima.main.temp_max-273.5).toFixed(1),temp_min: (data_clima.main.temp_min-273.5).toFixed(1), 
      temp_act: (data_clima.main.temp-273.5).toFixed(1), place:data_clima.name, desc_clima: data_clima.weather[0].description,
    icon: data_clima.weather[0].icon};
  }

    









}

