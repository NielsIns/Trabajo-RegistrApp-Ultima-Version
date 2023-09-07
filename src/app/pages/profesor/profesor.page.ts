import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { NgxQrcodeElementTypes, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FireService } from 'src/app/services/fire.service';
import { StorageAsistService } from 'src/app/services/storage-asist.service';
import { StorageClasesService } from 'src/app/services/storage-clases.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 } from 'uuid';



@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  userlogin: any = UsuarioService.user_login;
  isModalOpen = false;
  comenzar_clase: boolean = false;
  isClicked: boolean = false;
  mostrar_lista_asignaturas:boolean=false;
  mostrar_lista_asistencias:boolean=false;
  isEnabled: boolean=true;

  listaIds: number[];
  elementType = NgxQrcodeElementTypes.CANVAS;
  value = undefined;
  asistencias: any[]=[];
  asistenciasFire: any[]=[];
  personasFire: any[] = [];
  asignaturas: any[]=[];
  asignaturasFire: any[]=[];
  personas: any[]=[];
  KEY_ASISTENCIAS = 'asistencias';
  KEY_ASIGNATURAS = 'asignaturas';
  KEY_PERSONAS = 'personas';

  v_agregar:boolean = false
  user:any;
  rut:string;
  valor_plus: boolean = false;
  id:any

  usuario:any;

  asistencia = new FormGroup({
    id: new FormControl(),
    cod_asistencia: new FormControl(),
    cod_asignatura: new FormControl('',[Validators.required, Validators.minLength(2)]),
    horario: new FormControl(new Date()),
    alumnos: new FormControl([])
  });

  constructor(private menu: MenuController, private alertController: AlertController,
    private usuarioService: UsuarioService, private storageAsist: StorageAsistService, private storageClas: StorageClasesService,
    private router:Router, private dateTime: DatePipe, private activatedRoute: ActivatedRoute, private storageService: StorageService,
    private toastController: ToastController, private fireService: FireService) { }

  async ngOnInit() {
    await this.cargarAsignaturas();
    await this.cargarAsistencias();
    console.log(this.userlogin);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuario = await this.storageService.getDato(this.KEY_PERSONAS, this.rut);
    this.listar();
    this.listarAsig();
    this.listarAsist();

    //this.user = await this.router.getCurrentNavigation().extras.state.usuario;
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
  listarAsig(){
    this.fireService.getDatos('asignaturasFire').subscribe(
      (data:any) => {
        this.asignaturasFire = [];
        for(let a of data){
          let asignaturaJson = a.payload.doc.data();
          asignaturaJson['id'] = a.payload.doc.id;
          this.asignaturasFire.push(asignaturaJson);
          //console.log(u.payload.doc.data());
        }
      }
    );
  }
  listarAsist(){
    this.fireService.getDatos('asistenciasFire').subscribe(
      (data:any) => {
        this.asistenciasFire = [];
        for(let a of data){
          let asistenciaJson = a.payload.doc.data();
          asistenciaJson['id'] = a.payload.doc.id;
          this.asistenciasFire.push(asistenciaJson);
          //console.log(u.payload.doc.data());
        }
      }
    );
  }

  async cargarAsignaturas(){
    this.asignaturas = await this.storageClas.getDatos(this.KEY_ASIGNATURAS);
  }
  async cargarAsistencias(){
    this.asistencias = await this.storageAsist.getDatos(this.KEY_ASISTENCIAS);
  }

  listar_asignaturas(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_asignaturas');   
  }
  listar_asistencias(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_asistencias');   
  }

  mostrar_listas(valor:string){

    switch (valor) {
      case 'mostrar_lista_asistencias':
        this.mostrar_lista_asistencias=true;
        this.mostrar_lista_asignaturas = false;
        break;
      case 'mostrar_lista_asignaturas':
        this.mostrar_lista_asistencias=false;
        this.mostrar_lista_asignaturas = true;
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
   }

  anadirAsistencia(isOpen:boolean, id){
    this.isModalOpen=isOpen;

    let asistVar= v4();
    this.isEnabled = true;

    this.value=asistVar;
    
    this.asistencia.value.cod_asistencia = this.value;
    
    
    var asignaturaCompleto=this.asignaturasFire.find(x => x.id == id)
    this.asistencia.value.cod_asignatura = asignaturaCompleto;
    
    this.fireService.agregarusu('asistenciasFire', this.asistencia.value);


    this.claseIniciadaToast('top', 'Asistencia creada!');
    
    

  }
  /* async anadirAsistencia(cod_asig, isOpen:boolean){
    var asistencias = await this.storageAsist.getDatos(this.KEY_ASISTENCIAS);
    /*console.log(asistencias);
    this.listaIds = [];
    asistencias.forEach(objeto => { 
     this.listaIds.push(objeto.cod_asistencia);
     });
    var id_nueva = Math.max(...this.listaIds);
    //this.asistencia.value.cod_asistencia= id_nueva+1;
    this.asistencia.value.cod_asistencia= v4();

    var asignaturaEncontrado = await this.storageClas.getDato(this.KEY_ASIGNATURAS,cod_asig);

    this.asistencia.value.cod_asignatura = asignaturaEncontrado;

    var date_time: any;
    this.asistencia.value.horario = new Date();
    let currentDateTime =this.dateTime.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.log(currentDateTime);

    this.asistencia.value.alumnos = [] ;
    this.comenzar_clase = true;
    this.isModalOpen=isOpen;
    var respuesta: boolean = await this.storageAsist.agregar(this.KEY_ASISTENCIAS, this.asistencia.value);
    if (respuesta) {
      //var mensaje = 'asistencia creada agregada!';
      console.log('Asistencia creada!')
      this.claseIniciadaToast('top', 'Asistencia creada!');
      
      await this.cargarAsistencias();
    }
    

  }
 */
  

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('main-content');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  close_bd(isOpen: boolean){
    this.value='';
    this.isModalOpen = isOpen;
    this.isEnabled=true;

  }



  async claseIniciadaToast(position: 'top' | 'middle' | 'bottom', msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: position
    });

    toast.present();

  }


  agregarFireAsist(){
    this.fireService.agregarusu('asistenciasFire', this.asistencia.value);
    this.v_agregar = true;
  }

}
