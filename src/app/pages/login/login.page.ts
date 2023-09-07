import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FireService } from 'src/app/services/fire.service';
import { StorageAsistService } from 'src/app/services/storage-asist.service';
import { StorageClasesService } from 'src/app/services/storage-clases.service';
import { StorageLoginActService } from 'src/app/services/storage-login-act.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {

  admin: any = {

    rut: '13.489.275-7',
    nombre: 'Pamela',
    ap_paterno: 'Ríos',
    fecha_nac: '16-09-1986',
    semestre: '',
    password: 'administrador',
    email: 'administrador@duoc.cl',
    tipo_usuario: 'administrador',
    nombre_carrera: ''
  };
  prof: any = {

    rut: '16.424.159-9',
    nombre: 'Hugo',
    ap_paterno: 'Martinez',
    fecha_nac: '16-09-1978',
    semestre: '',
    password: 'profesor',
    email: 'profesor@profesor.duoc.cl',
    tipo_usuario: 'profesor',
    nombre_carrera: ''
  };
  asigna: any = {
    codigo_asig: '0',
    nom_asig: 'Asignatura de prueba',
    sigla_asig: 'ADP1234',
    semestre: '0',
    profesor: {
      nombre: 'Hugo',
      ap_paterno: 'Martinez',
      rut: '16.424.159-9'
    },
    nombre_carrera: 'Auditoria'

  };
  asistencia: any = {
    cod_asistencia: '0',
    cod_asignatura: {
      codigo_asig: '0'
    },
    horario: '15-10-2022',
    alumnos: [],
  };

  ingreso: any = {
    correo: '',
    clave: ''
  }

  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duoc|duocuc|profesor.duoc)+(?:(\\.cl))$')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });
  constructor(private toastController: ToastController, private router: Router,
    private usuarioService: UsuarioService, private storageService: StorageService, private storageClass: StorageClasesService,
    private storageAsist: StorageAsistService, private storageLogin: StorageLoginActService, private fireService: FireService) {
  }

  usuarios: any[];
  personas: any[] = [];
  personasFire: any[] = [];
  asignaturas: any[] = [];
  asistencias: any[] = [];
  logins: any[] = [];


  async ngOnInit() {
    //await this.estaLogueado();
    //await this.storageService.agregar(this.KEY_PERSONAS, this.admin);
    //this.fireService.agregarusu('personasFire', this.admin);
    //await this.storageService.agregar(this.KEY_PERSONAS, this.prof);
    //this.fireService.agregarusu('personasFire', this.prof);
    //await this.storageAsist.agregar(this.KEY_ASISTENCIAS, this.asistencia);

    /* await this.estaLogueado(); */
    //await this.storageClass.agregar(this.KEY_ASIGNATURAS, this.asigna);
    this.listar();
    console.log(this.personasFire);
  }

  KEY_PERSONAS = 'personas';
  KEY_ASIGNATURAS = 'asignaturas';
  KEY_ASISTENCIAS = 'asistencias';
  KEY_LOGIN = 'logins';

  login() {
    var idUser;
    let encontrado: boolean = false;
    var usu;

    for (let u of this.personasFire) {
      if (u.email == this.usuario.controls.correo.value && u.password == this.usuario.controls.clave.value) {
        encontrado = true;
        usu = u;
      }
    }
   
    if (encontrado) {
      this.ingreso.correo = this.usuario.value.correo;
      this.ingreso.clave = this.usuario.value.clave;
      idUser = usu.id;
      this.fireService.validarUser('personasFire', usu.email, usu.password)
      
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usu
        }
      };

      
      this.storageLogin.agregar(this.KEY_LOGIN, this.ingreso);
      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      this.router.navigate(['/home/perfil/' + idUser], navigationExtras);
      this.tostadaCorrecto('top');
    }else{
      this.tostadaIncorrecto();
    }

    

    /*let loginUser;
    var datosUser;
    //var usuarioLogin = await this.usuarioService.validarEmailPassword(this.usuario.controls.correo.value, this.usuario.controls.clave.value);
    //var usuarioLoginStr = await this.storageService.validarUser(this.usuario.controls.correo.value, this.usuario.controls.clave.value);
    var usuarioLoginStrFire = await this.fireService.validarUser('personasFire',this.usuario.controls.correo.value, this.usuario.controls.clave.value)

    //console.log(datosUser.rut);
    console.log(usuarioLoginStrFire);
    
    if (usuarioLoginStrFire != undefined) {

      this.ingreso.correo = this.usuario.value.correo;
      this.ingreso.clave = this.usuario.value.clave;
      //console.log(usuarioLogin);
      //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLoginStrFire
        }
      };
      this.tostadaCorrecto('top');

      console.log(usuarioLoginStrFire);
      //this.storageLogin.agregar(this.KEY_LOGIN, this.ingreso);
      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      this.router.navigate(['/home/perfil/'+usuarioLoginStrFire] , navigationExtras);

    } else {
      this.tostadaIncorrecto();
    }*/
  }

  listar() {
    this.fireService.getDatos('personasFire').subscribe(
      (data: any) => {
        this.personasFire = [];
        for (let u of data) {
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.personasFire.push(usuarioJson);
          console.log(this.personasFire);
          //console.log(u.payload.doc.data());
        }
      }
    );
  }

  async cargarPersonas() {
    this.personas = await this.storageService.getDatos(this.KEY_PERSONAS) || [];
  }

  async cargarAsignaturas() {
    this.asignaturas = await this.storageClass.getDatos(this.KEY_ASIGNATURAS) || [];
  }
  async cargarAsistencias() {
    this.asistencias = await this.storageAsist.getDatos(this.KEY_ASISTENCIAS) || [];
  }


   /* async estaLogueado() {



    var usu = await this.storageLogin.estaLogueado();

    if (usu != undefined) {

      var idUser;
      let encontrado: boolean = false;
      var userLog;

      for (let u of this.personasFire) {
        if (u.email == usu.email && u.password == usu.password) {
          encontrado = true;
          userLog = u;
        }
      }

      console.log(encontrado)
      if (encontrado) {
        this.ingreso.correo = this.usuario.value.correo;
        this.ingreso.clave = this.usuario.value.clave;
        idUser = userLog.id;
        this.fireService.validarUser('personasFire', userLog.email, userLog.password)
        let navigationExtras: NavigationExtras = {
          state: {
            usuario: userLog
          }
        };
  
        this.router.navigate(['/home/perfil/' + idUser], navigationExtras);

      }}




    } */







  //toast
  async tostadaIncorrecto() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña son incorrectos!',
      duration: 3000
    });
    toast.present();
  }

  async tostadaCorrecto(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Usuario logeado correctamente!',
      duration: 3000,
      position: position
    });
    toast.present();
  }



}
