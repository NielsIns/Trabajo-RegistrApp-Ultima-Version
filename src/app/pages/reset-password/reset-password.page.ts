import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: string;

  personasFire: any[]=[];

  mensaje_co:string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService, private storage: StorageService,
    private fireService: FireService) { }

  async ngOnInit() {

    await this.listar();
  }

  /* emailChequear(){
    var usuarioEmail = this.storage.validarEmail(this.email);
    if (usuarioEmail != undefined) {
      this.mensaje_co='El correo ha sido enviado correctamente!'
      this.email = '';
      this.tostadaConfirmarCorreo(this.mensaje_co)
    }else{
      this.mensaje_co='El correo ingresado es inválido'
      this.tostadaConfirmarCorreo(this.mensaje_co)

    }
  }

  async tostadaConfirmarCorreo(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  } */

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

  emailChequear(){
    var usuarioEmail = this.personasFire.find(x => x.email==this.email);
    if (usuarioEmail != undefined) {
      this.mensaje_co='El correo ha sido enviado correctamente!'
      this.email = '';
      this.tostadaConfirmarCorreo(this.mensaje_co)
    }else{
      this.mensaje_co='El correo ingresado es inválido'
      this.tostadaConfirmarCorreo(this.mensaje_co)

    }
  }

  async tostadaConfirmarCorreo(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }


}
