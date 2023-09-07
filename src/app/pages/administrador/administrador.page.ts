import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import {  validate, clean, format, getCheckDigit } from 'rut.js'
import { StorageService } from 'src/app/services/storage.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { StorageClasesService } from 'src/app/services/storage-clases.service';
import { FireService } from 'src/app/services/fire.service';



@Component({
  
  
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  standalone = {
    standalone : true
  };

  persona: any = {
    rut: '',
    nombre: '',
    ap_paterno: '',
    fecha_nac: '',
    semestre: '',
    password: '',
    email: '',
    tipo_usuario: ''
  };
  asignatu: any = {
    codigo_asig: '',
    nom_asig: '',
    sigla_asig: '',
    semestre: '',
    profesor: '',
  };

  nombre_profesor: string="";

  //Formularios:
  user = new FormGroup({
    id: new FormControl(),
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-ZÑ]{1}[a-zñ]*$/)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-ZÑ]{1}[a-zñ]*$/)]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern(/^((?!\s{1,}).)*$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*')]),
    tipo_usuario: new FormControl(''),
    nombre_carrera: new FormControl(''),
    
  });

  asignatura = new FormGroup({
    id: new FormControl(),
    codigo_asig : new FormControl(),
    nom_asig: new FormControl('', [Validators.required, Validators.minLength(8)]),
    sigla_asig: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    profesor: new FormControl(),
    nombre_carrera: new FormControl(),
  });
  
  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  userlogin: any ;
  usuariosSer: any = UsuarioService.usuarios;
  usuarios: any[] = [];
  verificar_password: string;
  isClicked : boolean = false;
  mostrar_lista_profesores: boolean=false;
  mostrar_lista_alumnos:boolean=false;
  mostrar_lista_administradores:boolean=false;
  mostrar_lista_asignaturas:boolean=false;
  buscar_usuario: boolean = false;
  buscar_asigna: boolean = false;
  chequeo: boolean = false;
  chequeoAsig: boolean = false;
  isModalOpen = false;
  agregar: boolean = false;
  agregarAsig: boolean = false;
  today:any;
  dominio:any;
  validoFecha: boolean = false;
  v_agregar: boolean = false;
  message_alert: string;
  usuario_logueado: any;
  listaIds: number[];
  asig_one: any;
  person_one:any ;
  rut: string;
  usuario: any;
  nombre_ad: string;
  nom_profesor: any;
  ap_profesor: any;
  nomcom_prof:any;
  //Arrays:
  personas: any[] = [];
  personasFire: any[] = [];
  //asignaturas: any[] = [];
  asignaturasFire: any[] = [];
  //Llaves:
  KEY_PERSONA = 'personas';
  //KEY_ASIGNATURAS = 'asignaturas';


  constructor(private modalCtrl: ModalController,private usuarioService: UsuarioService, 
    private router: Router, public modalController: ModalController, public actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController, private alertController: AlertController, private storageService: StorageService,
    private validacionesService: ValidacionesService, private activatedRoute: ActivatedRoute, private storageClas: StorageClasesService,
    private fireService: FireService) {
     }

     //Variables para probar Storage
  /*persona : any = {
    rut: '13233432-4',
    nombre: "Jessica Jung"
  };
  nuevaPersona: any = {
    rut : '13222333-2',
    nombre : 'Charles Chensual'
  };
  //Llave:
  KEY_PERSONA = 'personas';


  constructor( private storage: StorageService) { }

  async ngOnInit() {
    await this.storage.agregar (this.KEY_PERSONA , this.persona);
    //await this.storage.eliminar (this.KEY_PERSONA, this.persona.rut);
    await this.storage.actualizar (this.KEY_PERSONA, this.nuevaPersona);
  }*/

  id:any;


  ngOnInit() {
    //this.usuario_logueado = this.router.getCurrentNavigation().extras.state.usuario;
    //await this.cargarPersonas();
    //await this.cargarAsignaturas();
    console.log(this.getDate())
    console.log(this.usuarios);
    this.getDate();
    this.userlogin  = UsuarioService.user_login;
    console.log(this.userlogin);
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    this.usuario =  this.fireService.getDato('personasFire',this.id );
    //this.usuario.nombre = this.nombre_ad;
    this.listar();
    this.listarAsig();
    /*this.variable = 'a';
    console.log(this.variable);  
    console.log(this.variable);*/
  }
  
  //para validar fecha ingresada
  getDate() { 
    const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); 
    console.log(this.today); 
  }

  async cargarPersonas(){
    this.personas = await this.storageService.getDatos(this.KEY_PERSONA);
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
  

  

  //método del formulario
  async anadirUser(){
    var rut_user=this.validacionesService.validarRut(this.user.controls.rut.value);
    var validarEdad = this.usuarioService.calcularEdad(this.user.controls.fecha_nac.value);
    var validarFecha = this.user.controls.fecha_nac.value;
    if (this.user.controls.password.value != this.verificar_password) {
      

      this.message_alert='Las contraseñas no coinciden!';
      this.presentAlert(this.message_alert);  
      return;
    }
    if (this.today <= validarFecha ) {
      this.validoFecha = true;
      this.message_alert='La fecha no puede ser posterior a hoy ';
      this.presentAlert(this.message_alert);  
      return;      
    }
    if (validarEdad <= 16) {
      this.message_alert='Edad no puede ser menor a 17 años!';
      this.presentAlert(this.message_alert);  
      return;
    }
    if (rut_user == false) {
      this.message_alert='Usuario con rut no valido';
      this.presentAlert(this.message_alert);  
      return;
    }

    var usuFind = this.buscarUserr();


    console.log(usuFind);

    if (usuFind == undefined) {

      if (this.user.value.tipo_usuario=='alumno') {
        this.user.value.email=this.user.value.email+'@duocuc.cl';
        this.fireService.agregarusu('personasFire', this.user.value);
        await this.listar();
        this.message_alert='Usuario agregado con exito!';
        
      }else if(this.user.value.tipo_usuario=='profesor'){
        this.user.value.email=this.user.value.email+'@profesor.duoc.cl';
        this.fireService.agregarusu('personasFire', this.user.value);
        await this.listar();
        this.message_alert='Usuario agregado con exito!';
      }else if(this.user.value.tipo_usuario=='administrador'){
        this.user.value.email=this.user.value.email+'@duoc.cl';
        this.fireService.agregarusu('personasFire', this.user.value);
        await this.listar();
        this.message_alert='Usuario agregado con exito!';
      }
      
      this.presentAlert(this.message_alert);
      this.user.reset();
      this.verificar_password = '';
      
      
  
    }else{
      this.message_alert='Usuario ya se encuentra registrado!';
      
      this.presentAlert(this.message_alert);
  
    }
    }

    buscarUserr(){
      var usuRut:any;
      var usuFind=this.personasFire.find(usu => usu.rut == this.user.value.rut);
      
      if (usuFind != undefined) {
        usuRut=usuFind.rut
        console.log(usuRut);
      }else{
        usuRut=undefined;
      }
      return usuRut;
    }



  /* async eliminarStorage(rutEliminar){
      await this.storageService.eliminar(this.KEY_PERSONA,rutEliminar);
      await this.cargarPersonas();
      
  } */


  async eliminar(id){
    //await this.storageService.eliminar(this.KEY_PERSONA,rutEliminar);
    //await this.cargarPersonas();
    this.fireService.eliminar('personasFire', id);
    this.listar();
  }

  es_user: boolean=false;

  //PENDIENTE
  /* async buscar(rutBuscar, isOpen: boolean, id){
    this.isClicked = true;
    this.buscar_usuario = true;
    this.agregar = false;
    //var usuarioEncontrado = await this.storageService.getDato(this.KEY_PERSONA,rutBuscar);
    //console.log(usuarioEncontrado)
    this.isModalOpen = isOpen;
    this.chequeo = true;
    this.chequeoAsig = false;

    /*if (usuarioEncontrado != undefined) {

      this.persona = usuarioEncontrado;
      this.user.setValue(this.persona);
      this.verificar_password= this.user.value.password;
      this.es_user=usuarioEncontrado;
      
      
    }
    
    let userFind = this.fireService.getDato('personasFire', id);
    userFind.subscribe(
      (response: any) => {
        //console.log(response.data());
        let usu = response.data();
        usu['id'] = response.id;
        //console.log(usu);

        this.user.setValue( usu );
      }
    );
   

  } */
  buscar(isOpen: boolean, id){
    this.isClicked = true;
    this.buscar_usuario = true;
    this.agregar = false;
    this.buscar_asigna=false;
    //var usuarioEncontrado = await this.storageService.getDato(this.KEY_PERSONA,rutBuscar);
    //console.log(usuarioEncontrado)
    this.isModalOpen = isOpen;
    this.chequeo = true;
    this.chequeoAsig = false;
    console.log(this.chequeo);
    this.es_user=true;

    
    /*if (usuarioEncontrado != undefined) {

      this.persona = usuarioEncontrado;
      this.user.setValue(this.persona);
      this.verificar_password= this.user.value.password;
      this.es_user=usuarioEncontrado;
      
      
    }*/
    
    let userFind = this.fireService.getDato('personasFire', id);
    userFind.subscribe(
      (response: any) => {
        //console.log(response.data());
        let usu = response.data();
        usu['id'] = response.id;
        //console.log(usu);

        var email_value
        console.log(usu.email.indexOf('@'))
        email_value=usu.email.slice(0,usu.email.indexOf('@'))
        console.log(email_value)

        this.user.setValue(usu);
        this.user.controls.email.setValue(email_value)
        this.verificar_password= this.user.value.password;
      }
    );
   

  }



  close_bd(isOpen: boolean){
    this.limpiar();
    this.isModalOpen = isOpen;

  }



  async modificar(){
    //alert(this.alumno.value);
    //console.log(this.alumno.value);
    console.log(this.user)

    if (this.user.value.tipo_usuario=='alumno') {
      this.user.value.email=this.user.value.email+'@duocuc.cl';
      
    }
    if (this.user.value.tipo_usuario=='profesor') {
      this.user.value.email=this.user.value.email+'@profesor.duoc.cl';
      this.user.value.semestre='';
      this.user.value.nombre_carrera='';
      
    }
    if (this.user.value.tipo_usuario=='administrador') {
      this.user.value.email=this.user.value.email+'@duoc.cl';
      this.user.value.semestre='';
      this.user.value.nombre_carrera='';
      
    }

    console.log(this.user.controls.email.value)
    



    let id = this.user.controls.id.value;
    
    let usuModificado = {
      id: this.user.controls.id.value,
      rut: this.user.controls.rut.value,
      nombre: this.user.controls.nombre.value,
      ap_paterno: this.user.controls.ap_paterno.value,
      fecha_nac: this.user.controls.fecha_nac.value,
      semestre: this.user.value.semestre,
      password: this.user.controls.password.value,
      email: this.user.value.email,
      tipo_usuario: this.user.controls.tipo_usuario.value,
      nombre_carrera: this.user.value.nombre_carrera
    }

    console.log(this.user.value.semestre)
    console.log(this.user.value.nombre_carrera)
    //await this.storageService.actualizar(this.KEY_PERSONA, this.user.value);
    this.fireService.modificar('personasFire', id, usuModificado);
    //await this.cargarPersonas()
    this.listar();
    //arreglar verificar_password´
    this.tostadaConfirmMod('bottom')
    this.limpiar();

    
    
    //this.usuario.removeControl('id')
    //console.log(this.usuario.value)
    
    
    this.user.reset();
  }


  async limpiar(){
    this.user.reset();
    this.verificar_password='';
  }
  async limpiarAsig(){
    this.asignatura.reset();
    this.verificar_password='';
  }

  listar_profesores(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_profesores');   
  }
  
  listar_administradores(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_administradores');   
  }
  listar_alumnos(){
    this.isClicked = true;
    console.log(this.usuarios)
    this.mostrar_listas('mostrar_lista_alumnos');   
  }

  agregarUser(isOpen: boolean){
    this.user.reset()
    this.agregar = true;
    this.agregarAsig = false;
    this.buscar_asigna=false;
    this.buscar_usuario = false;
    this.isModalOpen = isOpen;
    return isOpen;   
  }

  //asignaturas y usuarios

  mostrar_listas(valor:string){

    switch (valor) {
      case 'mostrar_lista_profesores':
        this.mostrar_lista_profesores= true;
        this.mostrar_lista_alumnos=false;
        this.mostrar_lista_administradores = false;
        this.mostrar_lista_asignaturas = false;
        break;
      case 'mostrar_lista_alumnos':
        this.mostrar_lista_profesores= false;
        this.mostrar_lista_alumnos=true;
        this.mostrar_lista_administradores = false;
        this.mostrar_lista_asignaturas = false;
        break;
      case 'mostrar_lista_administradores':
        this.mostrar_lista_profesores= false;
        this.mostrar_lista_alumnos=false;
        this.mostrar_lista_administradores = true;
        this.mostrar_lista_asignaturas = false;
        break;
      case 'mostrar_lista_asignaturas':
        this.mostrar_lista_profesores= false;
        this.mostrar_lista_alumnos=false;
        this.mostrar_lista_administradores = false;
        this.mostrar_lista_asignaturas = true;
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }


    
    
  }

  //Asignaturas:

  /* async cargarAsignaturas(){
    this.asignaturas = await this.storageClas.getDatos(this.KEY_ASIGNATURAS);
  } */

  listar_asignaturas(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_asignaturas');   
  }

  agregarAsignaturas(isOpen: boolean){
    this.asignatura.reset()
    this.agregarAsig = true;
    this.agregar = false;
    this.buscar_asigna=false;
    this.buscar_usuario = false;
    this.isModalOpen = isOpen;
    return isOpen;
  }

  async anadirAsignaturas(){
    /* const lastElement = await this.asignaturas[this.asignaturas.length - 1]; */
    this.listarAsig();
    
    /*if(lastElement != undefined){
      //this.asignatura.controls.codigo_asig.setValue(lastElement.id+1);
      //this.asignatura.setValue(lastElement.id+1);
    }
   else{
    this.asignatura.controls.codigo_asig.setValue(0);
   }*/
   //ID autoincrementable
   //var asignaturas = await this.storageClas.getDatos(this.KEY_ASIGNATURAS);
   var asignaturas = this.asignaturasFire;
   console.log(asignaturas);
   this.listaIds = [];
   asignaturas.forEach(objeto => { 
    this.listaIds.push(objeto.codigo_asig);
    });
   var id_nueva = Math.max(...this.listaIds);
   this.asignatura.value.codigo_asig=id_nueva+1;

   //obtener json profesor
   console.log(this.personas);
   console.log(this.personasFire);
   console.log(this.asignatura.value.profesor);

   var persona = this.personasFire.filter(objeto => {
    console.log(objeto);
    console.log(this.asignatura.value.profesor.trim());
    console.log(this.asignatura.value);
    console.log(objeto.nombre+objeto.ap_paterno);
    console.log(this.asignatura.value.profesor.trim());

    if ((objeto.nombre+' '+objeto.ap_paterno) == this.asignatura.value.profesor.trim()) {
      console.log('hola');
    }
    return (objeto.nombre+' '+objeto.ap_paterno) == this.asignatura.value.profesor.trim();
   })[0];
   console.log(persona);
   this.asignatura.value.profesor= {
    id: persona.id,
    nombre: persona.nombre,
    ap_paterno: persona.ap_paterno,
    rut: persona.rut
   };
   
   let agregarSi: boolean = false;

   for (let a of this.asignaturasFire) {
    if (a.codigo_asig == this.asignatura.controls.codigo_asig.value) {
      agregarSi=true;
    }
    
   }

   if (!agregarSi) {
     this.fireService.agregarusu('asignaturasFire', this.asignatura.value);
     this.presentAlert('Asignatura agregada!');
     this.listarAsig();
     this.agregarAsig=false;
     this.asignatura.reset();
   }else{
    this.presentAlert('Fallo al ingresar la asignatura');
   }

   /*var respuesta: boolean = await this.storageClas.agregar(this.KEY_ASIGNATURAS, this.asignatura.value);
   if (respuesta) {
     this.presentAlert('Asignatura agregada!');
     await this.cargarAsignaturas();
   }*/

  }

  es_asig: any;

  buscarAsig(isOpen: boolean, id){
   // document.getElementById(codBuscar);
    this.isClicked = true;
    this.buscar_asigna = true;
    this.agregar = false;
    this.agregarAsig=false;
    this.buscar_usuario=false;
    console.log(id)
    //var asignaturaEncontrado = await this.storageClas.getDato(this.KEY_ASIGNATURAS,codBuscar);
    let asignaturaEncontrado = this.fireService.getDato('asignaturasFire', id);
    console.log(asignaturaEncontrado)
    this.isModalOpen = isOpen;
    this.chequeo = false;
    this.chequeoAsig = true;

    asignaturaEncontrado.subscribe(
      (response: any) => {
        let asigna = response.data();
        console.log(asigna)
        asigna['id'] = response.id;
        
        this.asignatura.setValue( asigna );
      }
    );

    /*if (asignaturaEncontrado != undefined) {
      this.asignatu=asignaturaEncontrado;
      console.log(this.asignatu)

    
      

      this.asignatura.setValue(this.asignatu);
      
      //document.getElementById("itemprof").click();
      //document.getElementById("itemprof").shadowRoot.children[0].innerHTML='ffff'
      
      this.es_asig=asignaturaEncontrado;
      
      
    }*/
    

   

  }

  /* async eliminarAsig(codAsigEliminar){
    await this.storageClas.eliminar(this.KEY_ASIGNATURAS,codAsigEliminar);
    await this.cargarAsignaturas();
    console.log(codAsigEliminar);
  } */

  eliminarAsig(id){
    this.fireService.eliminar('asignaturasFire',id);
    this.listarAsig();
    console.log(id);
  }

  /* async modificarAsig(){
  //alert(this.alumno.value);
    //console.log(this.alumno.value);
    var persona = this.personas.filter(objeto => {
      console.log(objeto);
      console.log(this.asignatura.value.profesor.trim());
      console.log(this.asignatura.value);
      console.log(objeto.nombre+objeto.ap_paterno);
      console.log(this.asignatura.value.profesor.trim());
  
      if ((objeto.nombre+' '+objeto.ap_paterno) == this.asignatura.value.profesor.trim()) {
        console.log('hola');
      }
      return (objeto.nombre+' '+objeto.ap_paterno) == this.asignatura.value.profesor.trim();
     })[0];
     console.log(persona);
     this.asignatura.value.profesor= {
      nombre: persona.nombre,
      ap_paterno: persona.ap_paterno,
      rut: persona.rut
     };
    await this.storageClas.actualizar(this.KEY_ASIGNATURAS, this.asignatura.value);
      //arreglar verificar_password´
    this.tostadaConfirmModAsig('bottom')
    this.limpiarAsig();
  } */

  async modificarAsig(){
    //alert(this.alumno.value);
      //console.log(this.alumno.value);
      var persona = this.personasFire.filter(objeto => {
        console.log(objeto);
        console.log(this.asignatura.value);
        console.log(objeto.nombre+objeto.ap_paterno);
    
        if ((objeto.nombre+' '+objeto.ap_paterno) == this.asignatura.value.profesor.trim()) {
          console.log('hola');
        }
        return (objeto.nombre+' '+objeto.ap_paterno) == this.asignatura.value.profesor.trim();
       })[0];
       console.log(persona);
       var prof=
       this.asignatura.value.profesor= {
        id: persona.id,
        nombre: persona.nombre,
        ap_paterno: persona.ap_paterno,
        rut: persona.rut
       };
      let id = this.asignatura.controls.id.value;
      let asignaturaAct = {
        id: this.asignatura.controls.id.value,
        codigo_asig: this.asignatura.controls.codigo_asig.value,
        nom_asig: this.asignatura.controls.nom_asig.value,
        sigla_asig: this.asignatura.controls.sigla_asig.value,
        semestre: this.asignatura.controls.semestre.value,
        profesor: prof,
        nombre_carrera: this.asignatura.controls.nombre_carrera.value,
           
      }
      this.fireService.modificar('asignaturasFire', id, asignaturaAct);
      this.asignatura.reset();
      this.tostadaConfirmModAsig('bottom')
      this.limpiarAsig();
    }


  async testeoSheet(idUser) {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Eliminar Usuario?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Si',
        id: 'delete-button',
        icon: 'trash',
        handler: () => {
          this.eliminar(idUser);
          this.tostadaConfirma('top');
          
        }
      }, {
        text: 'No',
        icon: 'caret-back-outline',
        handler: () => {
          console.log('No clicked');
          this.tostadaDesConfirma('top');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
  async asigSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Eliminar Asignatura?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Si',
        id: 'delete-button',
        icon: 'trash',
        handler: () => {
          this.eliminarAsig(id);
          console.log(id);
          this.tostadaConfirmaAsig('top');
          
        }
      }, {
        text: 'No',
        icon: 'caret-back-outline',
        handler: () => {
          console.log('No clicked');
          this.tostadaDesConfirmaAsig('top');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
//
async tostadaConfirma(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'Usuario eliminado correctamente!',
    duration: 5000,
    position: position
  });
  toast.present();
}
async tostadaConfirmaAsig(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'Asignatura eliminada correctamente!',
    duration: 5000,
    position: position
  });
  toast.present();
}
async tostadaDesConfirma(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'El usuario no ha sido eliminado',
    duration: 5000,
    position: position
  });
  toast.present();
}
async tostadaDesConfirmaAsig(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'La asignatura no ha sido eliminada',
    duration: 5000,
    position: position
  });
  toast.present();
}
async tostadaConfirmMod(position: 'bottom') {
  const toast = await this.toastController.create({
    message: 'El usuario ha sido modificado con exito!',
    duration: 3000,
    position: position
  });
  toast.present();
}
async tostadaConfirmModAsig(position: 'bottom') {
  const toast = await this.toastController.create({
    message: 'La asignatura ha sido modificada con exito!',
    duration: 3000,
    position: position
  });
  toast.present();
}

async presentAlert(mensaje_a) {
  const alert = await this.alertController.create({
    cssClass: 'custom-alert',
    header: 'Atención!',
    subHeader: mensaje_a,
    buttons: ['OK'],
  });

  await alert.present();
}

handleChange(ev) {
  //ev.target.value = 'hola';
  //ev.currentTarget='gg'
 
}

agregarFire(){
  this.fireService.agregarusu('personasFire', this.persona.value);
  this.v_agregar = true;
}
agregarFireAsig(){
  this.fireService.agregarusu('asignaturasFire', this.asignatura.value);
  this.v_agregar = true;
}


/* METODOS STORAGE!!!! */

}