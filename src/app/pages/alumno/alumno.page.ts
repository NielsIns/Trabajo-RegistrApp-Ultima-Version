import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';

import { FireService } from 'src/app/services/fire.service';
import { StorageAsistService } from 'src/app/services/storage-asist.service';
import { StorageClasesService } from 'src/app/services/storage-clases.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  userlogin: any = UsuarioService.user_login;
  isModalOpen = false;
  comenzar_clase: boolean = false;
  asistencias: any[]=[];
  asignaturas: any[]=[];
  personasFire: any[]=[];
  personas: any[]=[];
  asistenciasFire: any[]=[];
  asistenciaFi: any[]=[];
  KEY_ASISTENCIAS = 'asistencias';
  KEY_ASIGNATURAS = 'asignaturas';
  KEY_PERSONAS = 'personas';
  rut: string;
  id: any;
  nombre: string;
  nombre_carrera: string;
  ap_paterno: string;
  usuario: any;

  asistencia_actu: any;

  cod_asistencia_alumno: any ;
  asistencia_alumno: any = false;

  /* asistencia = new FormGroup({
    id: new FormControl(),
    cod_asistencia: new FormControl(),
    cod_asignatura: new FormControl(),
    horario: new FormControl(),
    alumnos: new FormControl([])
  }); */

  constructor(private menu: MenuController, private alertController: AlertController,
    private usuarioService: UsuarioService, private storageAsist: StorageAsistService, private storageClas: StorageClasesService,
    private router:Router, private activatedRoute: ActivatedRoute , private storage: StorageService, private loadingCtrl: LoadingController,
    private fireService: FireService) { }

  ngOnInit() {
    //await this.cargarAsignaturas();
    //await this.cargarAsistencias();
    console.log(this.userlogin);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.rut);
    //this.usuario = await this.storage.getDato(this.KEY_PERSONAS, this.rut);

    this.listarAsist();
    this.listar();
    
    

  }

  listar(){
    this.fireService.getDatos('personasFire').subscribe(
      (data:any) => {
        this.personasFire = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.personasFire.push(usuarioJson);
          //console.log(u.payload.doc.data());
        }
      }
    );
  } 


  listarAsist(){
    this.fireService.getDatos('asistenciasFire').subscribe(
      (data:any) => {
        this.asistenciaFi = [];
        for(let a of data){
          let asistenciaJson = a.payload.doc.data();
          asistenciaJson['id'] = a.payload.doc.id;
          this.asistenciaFi.push(asistenciaJson);
          //console.log(u.payload.doc.data());
        }
        console.log(this.asistenciaFi);
      }
    );
  }


  async cargarAsignaturas(){
    this.asignaturas = await this.storageClas.getDatos(this.KEY_ASIGNATURAS);
  }
  async cargarAsistencias(){
    this.asistencias = await this.storageAsist.getDatos(this.KEY_ASISTENCIAS);
  }



  comenzarAlert(isOpen:boolean) {
    this.comenzar_clase = true;
    this.isModalOpen=isOpen;
  }

  close_bd(isOpen: boolean){

    this.isModalOpen = isOpen;

  }

  
  


  async verificarCodigo(){

    
    let codigoAsist = this.asistenciaFi.find(x => x.cod_asistencia == this.cod_asistencia_alumno);
    let alumnoPrueba = this.personasFire.find(x => x.id == this.id);
    var existe_asist: boolean = false;
    var existe_carr: boolean = false;


    if (codigoAsist==undefined) {
      this.confirmAsistAlert('Ingrese un código válido');
      return;
    }

    console.log(codigoAsist)
    
    
    
    
    codigoAsist.alumnos.forEach(alum => {
      
      if (alum.rut == alumnoPrueba.rut) {
        existe_asist = true;
      }
      
    });
    
    if (codigoAsist.cod_asignatura.nombre_carrera.includes(alumnoPrueba.nombre_carrera)) {
      existe_carr = true
    }
    
    if (existe_carr) {
      if (!existe_asist) {
        codigoAsist.alumnos.push(alumnoPrueba);
        this.fireService.actualizarAsisFire(codigoAsist.id, codigoAsist);
        this.confirmAsistAlert('Asistencia registrada correctamente') ;
      } else {
        this.confirmAsistAlert('Asistencia ya registrada anteriormente');
      }
    } else {
      this.confirmAsistAlert('No registrado en la carrera')
    }
    console.log(codigoAsist);



    //var asistence = await this.storageAsist.getDatos(this.KEY_ASISTENCIAS);
    /* this.asistencia_actu = await this.storageAsist.getDato(this.KEY_ASISTENCIAS, this.cod_asistencia_alumno);
    if (this.asistencia_actu == undefined) {
      alert('ingrese codigo correcto');
    } else {
      
      this.asistencia_alumno = true;
      console.log(this.nombre);

      this.asistencia.setValue(this.asistencia_actu);

      console.log(this.asistencia.value);

      this.asistencia.value.alumnos = ({
        nombre: this.nombre,
        ap_paterno: this.ap_paterno,
        rut: this.rut,
        nombre_carrera: this.nombre_carrera,
        asistio: this.asistencia_alumno
      });

      /*this.asistencia_actu.controls.alumnos.value= {
        nombre: this.nombre,
        ap_paterno: this.ap_paterno,
        rut: this.rut,
        asistio: this.asistencia_alumno
      };

      
      var mensaje= await this.storageAsist.actualizarAlumnos(this.KEY_ASISTENCIAS, this.asistencia.value);

      this.confirmAsistAlert(mensaje);

      this.asistencia_alumno= false;
      this.cod_asistencia_alumno = undefined;
    } */
    
  }

  async confirmAsistAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Atención!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }



}
