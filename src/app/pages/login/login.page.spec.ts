import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment.prod';

import { LoginPage } from './login.page';

describe('Pruebas unitarias login', () => {
  beforeEach( async ()=>{

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        IonicStorageModule.forRoot(),
        RouterModule,
        RouterTestingModule
        
      ],
      declarations: [
        LoginPage
      ]

    }).compileComponents();
  });

  it('1. Carga de la página login', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  })

  it ('2. Formulario invalido', ()=>{
    const fixture = TestBed.createComponent (LoginPage);
    const app = fixture.componentInstance;

   
    let correo = app.usuario.controls ['correo'];
    let clave = app.usuario.controls ['clave'];
   

    correo.setValue('juan.p@gmail.com');
    clave.setValue('hola123');
    


    expect(app.usuario.valid).toBeFalse();
})


  it('3. Formulario válido',()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.usuario.controls ['correo'];
    let clave = app.usuario.controls ['clave'];
   

    correo.setValue('juan.p@duocuc.cl');
    clave.setValue('hola123');

    expect(app.usuario.valid).toBeTrue();
})


  it('4. Largo del arreglo de personas', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;
    
    app.listar();



    expect(app.personasFire.length).toBeGreaterThanOrEqual(0);
  });

});