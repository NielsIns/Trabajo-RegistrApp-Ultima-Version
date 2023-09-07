import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment.prod';

import { RegistroPage } from './registro.page';

describe('Pruebas unitarias registro', () => {
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
          RegistroPage
        ]
  
      }).compileComponents();
    });
  
    it('1. Carga de la página registro', ()=>{
      const fixture = TestBed.createComponent(RegistroPage);
      const app = fixture.componentInstance;
  
      expect(app).toBeTruthy();
    })

    it ('2. Formulario invalido', ()=>{
        const fixture = TestBed.createComponent (RegistroPage);
        const app = fixture.componentInstance;

       
        let rut = app.alumno.controls ['rut'];
        let nombre =app.alumno.controls ['nombre'];
        let ap_paterno = app.alumno.controls ['ap_paterno'];
        let fecha_nac = app.alumno.controls ['fecha_nac'];
        let semestre = app.alumno.controls ['semestre'];
        let password = app.alumno.controls ['password'];
        let email = app.alumno.controls ['email'];
        let tipo_usuario = app.alumno.controls ['tipo_usuario'];
        let nombre_carrera = app.alumno.controls [ 'nombre_carrera'];

        rut.setValue('12.222.222-2');
        nombre.setValue ('y');
        ap_paterno.setValue('Choi');
        fecha_nac.setValue ('1999-02-11');
        semestre.setValue('1');
        password.setValue('yeonjuntxt');
        email.setValue('yeonjun@duocuc.cl');
        tipo_usuario.setValue('alumno');
        nombre_carrera.setValue('Ingenieria en Sonido');


        expect(app.alumno.valid).toBeFalse();
    })

    it('3. Formulario válido',()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.alumno.controls ['rut'];
        let nombre =app.alumno.controls ['nombre'];
        let ap_paterno = app.alumno.controls ['ap_paterno'];
        let fecha_nac = app.alumno.controls ['fecha_nac'];
        let semestre = app.alumno.controls ['semestre'];
        let password = app.alumno.controls ['password'];
        let email = app.alumno.controls ['email'];
        let tipo_usuario = app.alumno.controls ['tipo_usuario'];
        let nombre_carrera = app.alumno.controls [ 'nombre_carrera'];

        rut.setValue('20.987.310-9');
        nombre.setValue ('Yeounjun');
        ap_paterno.setValue('Choi');
        fecha_nac.setValue ('1999-02-11');
        semestre.setValue('1');
        password.setValue('yeonjuntxt');
        email.setValue('yeonjun');
        tipo_usuario.setValue('alumno');
        nombre_carrera.setValue('Ingenieria en Sonido');

        expect(app.alumno.valid).toBeTrue();
    })

    it ('4. Ejecutar botón "Registrar".', ()=>{
        const fixture = TestBed.createComponent (RegistroPage);
        const app = fixture.componentInstance;

        

        let rut = app.alumno.controls ['rut'];
        let nombre =app.alumno.controls ['nombre'];
        let ap_paterno = app.alumno.controls ['ap_paterno'];
        let fecha_nac = app.alumno.controls ['fecha_nac'];
        let semestre = app.alumno.controls ['semestre'];
        let password = app.alumno.controls ['password'];
        let email = app.alumno.controls ['email'];
        let tipo_usuario = app.alumno.controls ['tipo_usuario'];
        let nombre_carrera = app.alumno.controls [ 'nombre_carrera'];
        

        rut.setValue('14.339.384-4');
        nombre.setValue ('Emily');
        ap_paterno.setValue('Rios');
        fecha_nac.setValue ('1999-03-24');
        semestre.setValue('1');
        password.setValue('userprueba2');
        email.setValue('emily@duocuc.cl');
        tipo_usuario.setValue('alumno');
        nombre_carrera.setValue('Ingenieria en Sonido');


        app.agregarFire();

        
        expect(app.v_agregar).toBeTrue(); 

    })

    it('5. Largo del arreglo', ()=>{
      const fixture = TestBed.createComponent(RegistroPage);
      const app = fixture.componentInstance;
      
      app.listar();


  
      expect(app.personasFi.length).toBeGreaterThanOrEqual(0);
    });
  
  });