import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { TouchSequence } from 'selenium-webdriver';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor( private router:Router, private fire: AngularFirestore) { }

  isAuthenticated = new BehaviorSubject (false);

  data:any;
  datas:any;
  //Metodos CRUD usuario

  async agregarusu (colleccion, value) {
    try {
      this.fire.collection(colleccion).add(value);
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  getDatos(colleccion){
    try {
      return this.fire.collection(colleccion).snapshotChanges();
      
    } catch (error) {
      console.log ('ERROR: ', error)
    }
  }
  eliminar (colleccion,id) {
    try {
      return this.fire.collection(colleccion).doc(id).delete();
    } catch (error) {
      console.log ('ERROR: ', error)
    }
  }
  getDato (colleccion,id){
    try {
      return this.fire.collection(colleccion).doc(id).get();
    } catch (error) {
      console.log ('ERROR: ', error);
    }
  }
  modificar (colleccion, id, value){
    try {
      this.fire.collection(colleccion).doc(id).set(value);
    } catch (error) {
      console.log ('ERROR: ', error)
    }
  }

  actualizarAsisFire(id,value){

    this.fire.collection('asistenciasFire').doc(id).set(value);

  }

  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }


  validarUser (colleccion, email, pass){
    this.isAuthenticated.next(true);
    console.log(this.isAuthenticated)

  }

  getAuth () {
      return this.isAuthenticated.value;
  }

    /*var usuario_login = this.datas.find(u => u.email == email && u.password == pass);

    if (usuario_login != undefined) {
      console.log(usuario_login.correo)
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      
      this.isAuthenticated.next(true);
      return usuario_login;
    }
    
    
  }*/
  /*validarUser (collecion, email, pass){
    var colection = this.fire.collection(collecion).snapshotChanges();
    
    var usuario_login = colection.find(u => u.email == email && u.password == pass);

    if (usuario_login != undefined) {
      console.log(usuario_login.correo)
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      
      this.isAuthenticated.next(true);
      return usuario_login;
    }

    
  }*/
}
