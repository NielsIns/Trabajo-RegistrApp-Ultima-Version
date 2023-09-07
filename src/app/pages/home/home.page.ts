import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FireService } from 'src/app/services/fire.service';
import { StorageLoginActService } from 'src/app/services/storage-login-act.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: any;
  rut:string;
  clave: any;
  logins: any [] = [];
  KEY_LOGINS='logins';
  id:any;
  dataClima: any={temp_max:'',temp_min:'',temp_act:'',place:'', desc_clima:'', icon:''};
  iconStr:any;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private usuarioService: UsuarioService,
    private storage: StorageService, private storageLoginAct: StorageLoginActService, private fireService: FireService,
    private apiService: ApiService) {}

  async ngOnInit(){

    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    await this.getWeatherData()
    this.id=this.usuario.id;
    this.clave=this.usuario.password;
    console.log(this.usuario.id);
    
    
  }

  
  
  logout(){
    console.log(this.rut)
    //this.storageLoginAct.eliminar(this.KEY_LOGINS, this.clave)
    //this.storage.logout();
    this.fireService.logout();
  }

  async getWeatherData() {
    // Suscribimos el componente a los eventos del servicio WeatherService
    /* const observable=this.apiService.weatherData$.subscribe((data:any) => {
      // Cuando se reciba la respuesta de la API, guardamos los datos en la variable weatherData
      this.weatherData = JSON.parse(data);
      console.log(this.weatherData)



    });


    
    console.log(this.weatherData)
    console.log(observable) */
    // Llamamos al método getWeather() del servicio para hacer la solicitud a la API de clima
    this.dataClima= await this.apiService.getWeatherData();
    this.iconStr = `https://openweathermap.org/img/wn/${this.dataClima.icon}@2x.png`
    console.log(this.dataClima)
  }

}
