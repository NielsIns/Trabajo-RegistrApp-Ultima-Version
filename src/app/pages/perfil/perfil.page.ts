import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  rut: string;
  usuario: any;
  correo: string;
  tipo_usuario: any;
  carrera: any;
  nombre: any;
  apellido: any;
  fecha_nac: any;
  id: any;
  usuarioDato: any;
  usuarioPrueba:any;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService,
    private fireService: FireService, private router: Router) { }

  personas: any [] = [];
  personasFire: any [] = [];
  KEY_PERSONAS= 'personas';


  ngOnInit() {
    this.usuarioPrueba=this.router.getCurrentNavigation().extras.state.usuario;
    console.log(this.usuarioPrueba)
    /* concat(this.listar()).subscribe(
      (data: any) => {
        console.log(data)
        
      }
    );
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    console.log(this.rut) */
    this.usuarioDato = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.usuarioDato)
    
  }


 /*  async cargaPagina(){

    if (this.personasFire.length!=0) {
      console.log(this.personasFire);

      

      this.usuario = this.fireService.getDato('personasFire', this.usuarioDato).subscribe(
        (data: any) =>{
          this.personasFire = [];
        for (let u of data) {
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.personasFire.push(usuarioJson);
          console.log(this.personasFire);
          this.cargaPagina();
        }
      }
      );
      
      this.rut = this.usuario.rut;
      
      console.log(this.usuario.rut)
      //this.id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.personasFire)
      //this.usuario = await this.storage.getDato(this.KEY_PERSONAS, this.rut);
      console.log(this.usuario)
      this.correo=this.usuario.email;
      this.nombre=this.usuario.nombre;
      this.apellido=this.usuario.ap_paterno;
      this.tipo_usuario=this.usuario.tipo_usuario;
      this.carrera = this.usuario.nombre_carrera;
      this.fecha_nac=this.usuario.fecha_nac;
      console.table(this.usuario);
    }

  }
  
  async listar() {
    await this.fireService.getDatos('personasFire').subscribe(
      (data: any) => {
        this.personasFire = [];
        for (let u of data) {
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.personasFire.push(usuarioJson);
          console.log(this.personasFire);
          this.cargaPagina();
          //console.log(u.payload.doc.data());
        }
      }
    );

    
  }

  async encontrarUsu(){
    console.log('s')
    console.log(this.personasFire)

    for (let u of this.personasFire) {
      console.log(u)
      
    }

  } */

}
