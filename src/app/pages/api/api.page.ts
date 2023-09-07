import { Component, OnInit } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {

  datos$: Observable<any>;
  

  dataClima: any={temp_max:'',temp_min:'',temp_act:'',place:'', desc_clima:''};
  cargando = false;
  city = "";
  region_name = "";
  country_name = "";
  hora = "";
  detallesHoy = {};
  detallesHoyDia: any;
  detallesHoyTempMin: any;
  detallesHoyTempMax: any;
  detallesProximos = [];
  latitud:any;
  longitud:any;
  datos_clima: any;
  weatherData: any;

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    
    await this.getWeatherData()
/*     const datosDeClima = await this.apiService.obtenerDatosDeClima();
    
    this.apiService.obtenerDatosDeClima();
  
    console.log(datosDeClima)
    /* await this.usarApi(); 
    
   
    console.log(await this.apiService.getWeather().then)
     */
  }
  
  
 /*  async usarApi(){
    await this.apiService.getWeather(this.latitud,this.longitud)
    
  } */

    

    /* await this.apiService.getWeather()
    const datosDeClima = this.apiService.obtenerDatosDeClima();
    console.log(datosDeClima) */
    /*this.detallesHoyDia = datosDeClima.dataseries.slice(0, 1)[0].date;
    this.detallesHoyTempMin=datosDeClima.dataseries.slice(0, 1)[0].temp2m.min
    this.detallesHoyTempMax=datosDeClima.dataseries.slice(0, 1)[0].temp2m.max
    console.log(this.detallesHoyDia)
    console.log(this.detallesHoyTempMax)
    console.log(this.detallesHoyTempMin)
    this.detallesProximos = datosDeClima.dataseries.slice(1, 5); */
  

  

  //MÉTODOS PARA EL MAPA:

  async getWeatherData() {
    // Suscribimos el componente a los eventos del servicio WeatherService
    const observable=this.apiService.weatherData$.subscribe((data:any) => {
      // Cuando se reciba la respuesta de la API, guardamos los datos en la variable weatherData
      this.weatherData = JSON.parse(data);
      console.log(this.weatherData)



    });


    
    console.log(this.weatherData)
    console.log(observable)
    // Llamamos al método getWeather() del servicio para hacer la solicitud a la API de clima
    this.dataClima= await this.apiService.getWeatherData();
    console.log(this.dataClima)
  }
}
  
  


