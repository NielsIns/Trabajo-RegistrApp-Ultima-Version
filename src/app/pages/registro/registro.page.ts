import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertController, Animation, AnimationController, ToastController} from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import {  validate, clean, format, getCheckDigit } from 'rut.js'
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { StorageService } from 'src/app/services/storage.service';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  today: any;
  fecha_naci: any;
  usuarios: any[] = [];
  v_agregar: boolean =false;

  

  alumno = new FormGroup({
    id: new FormControl(''),
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-ZÑ]{1}[a-zñ]*$/)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-ZÑ]{1}[a-zñ]*$/)]),
    fecha_nac: new FormControl('', Validators.required ),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern(/^((?!\s{1,}).)*$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*')]),
    tipo_usuario: new FormControl('alumno'),
    nombre_carrera: new FormControl(),
    
  });

  verificar_password: string;
  mensajea: string;
  validoFecha: boolean = false;
  mensaje:any;
  personas: any[] = [];
  personasFi: any[] = [];
  //Llave:
  KEY_PERSONA = 'personas';

  constructor(private usuarioService: UsuarioService, private router: Router,
    private alertController: AlertController, private toastController: ToastController,
    private validacionesService: ValidacionesService, private storageService: StorageService, private fireService: FireService) { }

  async ngOnInit() {
   
      
        await this.listar();
        
      
    
    //this.getDate();
    //console.log(this.alumno);
    //this.usuarios = this.usuarioService.obtenerUsuarios();
    //console.log(this.usuarios);
    //this.cargarPersonas();
  }

  getDate() { const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); console.log(this.today); }

  /* sync cargarPersonas(){
    this.personas = await this.storageService.getDatos(this.KEY_PERSONA);
  } */

  async listar(){
    
      this.fireService.getDatos('personasFire').subscribe(
        (data:any) => {
          this.personasFi = [];
          for(let u of data){
            let usuarioJson = u.payload.doc.data();
            usuarioJson['id'] = u.payload.doc.id;
            this.personasFi.push(usuarioJson);
            
            
          }
  
        }
      );
      
  } 

  async registrar(){
    
    /* console.log(this.personasFi) */
    var rut_user=this.validacionesService.validarRut(this.alumno.controls.rut.value);
    var validarEdad = this.usuarioService.calcularEdad(this.alumno.controls.fecha_nac.value);
    var validarFecha = this.alumno.controls.fecha_nac.value;
    if (this.alumno.controls.password.value != this.verificar_password) {
      

      this.mensajea='Las contraseñas no coinciden!';
      this.confirmAlert(this.mensajea);  
      return;
    }
    if (this.today <= validarFecha ) {
      this.validoFecha = true;
      this.mensajea='La fecha no puede ser posterior a hoy ';
      this.confirmAlert(this.mensajea);
      return;      
    }
    if (validarEdad <= 16) {
      this.mensajea='Edad no puede ser menor a 17 años!';
      this.confirmAlert(this.mensajea);
      return;
    }
    if (rut_user == false) {
      this.mensajea='Usuario con rut no valido';
      this.confirmAlert(this.mensajea);
      return;
    }

    var usuFind = this.buscarUserr();


    console.log(usuFind);

    if (usuFind == undefined) {
      this.alumno.value.email=this.alumno.value.email+'@duocuc.cl';
      console.log(this.alumno.value.email)
      this.fireService.agregarusu('personasFire', this.alumno.value);
      await this.listar();
      this.mensaje='Usuario agregado con exito!';
      this.confirmAlert(this.mensaje);
      this.alumno.reset();
      this.verificar_password = '';
      
  
    }else{
      this.mensaje='Usuario ya se encuentra registrado!';
      this.confirmAlert(this.mensaje);
  
    }
  
  }

    encontrado:boolean=false;

    buscarUserr(){
      
      var usuRut:any;
      var usuFind=this.personasFi.find(usu => usu.rut == this.alumno.value.rut);
      
      if (usuFind != undefined) {
        usuRut=usuFind.rut
        console.log(usuRut);
      }else{
        usuRut=undefined;
      }
      return usuRut;
    }
    
   


    /* console.log('hola1')
    console.log(this.alumno)
    this.usuarioService.agregarUsuario(this.alumno.value);
    this.tostadaCreateUser();
    console.log(validarFecha);
    console.log(validarFecha);
    console.log(this.alumno.value.tipo_usuario);
    console.log('ola');
    console.log(this.usuarioService.obtenerUsuarios);
    this.router.navigate(['/login']);
    this.alumno.reset();
    this.verificar_password = '';
    } */

    async tostadaCreateUser() {
      const toast = await this.toastController.create({
        message: 'Usuario registrado correctamente!',
        duration: 5000
      });
      toast.present();
    }

    agregarFire(){
      this.fireService.agregarusu('personasFire', this.alumno.value);
      this.v_agregar = true;
    }


    
    //this.alumno.reset();
    //this.verificar_password = '';
    async confirmAlert(mensaje) {
      const alert = await this.alertController.create({
        cssClass: 'custom-alert',
        header: 'Atención!',
        subHeader: mensaje,
        buttons: ['OK'],
      });
    
      await alert.present();
    }

  

  
}
