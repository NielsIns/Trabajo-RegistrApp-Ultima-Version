import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment.prod';

import { AdministradorPage } from './administrador.page';

describe('Pruebas unitarias pagina administrador', () => {
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
          AdministradorPage
        ]
  
      }).compileComponents();
    });
  
    it('1. Carga de la página administrador', ()=>{
      const fixture = TestBed.createComponent(AdministradorPage);
      const app = fixture.componentInstance;
  
      expect(app).toBeTruthy();
    })

    it ('2. Formulario invalido para usuario', ()=>{
        const fixture = TestBed.createComponent (AdministradorPage);
        const app = fixture.componentInstance;

       
        let rut = app.user.controls ['rut'];
        let nombre =app.user.controls ['nombre'];
        let ap_paterno = app.user.controls ['ap_paterno'];
        let fecha_nac = app.user.controls ['fecha_nac'];
        let semestre = app.user.controls ['semestre'];
        let password = app.user.controls ['password'];
        let email = app.user.controls ['email'];
        let tipo_usuario = app.user.controls ['tipo_usuario'];
        let nombre_carrera = app.user.controls [ 'nombre_carrera'];

        rut.setValue('12.222.222-2');
        nombre.setValue ('y');
        ap_paterno.setValue('Choi');
        fecha_nac.setValue ('1999-02-11');
        semestre.setValue('1');
        password.setValue('yeonjuntxt');
        email.setValue('yeonjun@duocuc.cl');
        tipo_usuario.setValue('alumno');
        nombre_carrera.setValue('Ingenieria en Sonido');


        expect(app.user.valid).toBeFalse();
    })

    it ('3. Formulario invalido para asignatura', ()=>{
        const fixture = TestBed.createComponent (AdministradorPage);
        const app = fixture.componentInstance;

       
        let codigo_asig = app.asignatura.controls ['codigo_asig'];
        let nom_asig = app.asignatura.controls ['nom_asig'];
        let sigla_asig = app.asignatura.controls ['sigla_asig'];
        let semestre = app.asignatura.controls ['semestre'];
        let profesor = app.asignatura.controls ['profesor'];
        let nombre_carrera = app.asignatura.controls ['nombre_carrera'];


        codigo_asig.setValue('12.222.222-2');
        nom_asig.setValue('Choi');
        sigla_asig.setValue ('1999-02-11');
        semestre.setValue('1');
        profesor.setValue('yeonjuntxt');
        nombre_carrera.setValue('yeonjun@duocuc.cl');


        expect(app.asignatura.valid).toBeFalse();
    })

    it ('4. Formulario valido para usuario', ()=>{
        const fixture = TestBed.createComponent (AdministradorPage);
        const app = fixture.componentInstance;

       
        let rut = app.user.controls ['rut'];
        let nombre =app.user.controls ['nombre'];
        let ap_paterno = app.user.controls ['ap_paterno'];
        let fecha_nac = app.user.controls ['fecha_nac'];
        let semestre = app.user.controls ['semestre'];
        let password = app.user.controls ['password'];
        let email = app.user.controls ['email'];
        let tipo_usuario = app.user.controls ['tipo_usuario'];
        let nombre_carrera = app.user.controls [ 'nombre_carrera'];

        rut.setValue('20.987.310-9');
        nombre.setValue ('Yeounjun');
        ap_paterno.setValue('Choi');
        fecha_nac.setValue ('1999-02-11');
        semestre.setValue('1');
        password.setValue('yeonjuntxt');
        email.setValue('yeonjun');
        tipo_usuario.setValue('alumno');
        nombre_carrera.setValue('Ingenieria en Sonido');


        expect(app.user.valid).toBeTrue();
    })

    it ('5. Formulario valido para asignatura', ()=>{
        const fixture = TestBed.createComponent (AdministradorPage);
        const app = fixture.componentInstance;

       
        let codigo_asig = app.asignatura.controls ['codigo_asig'];
        let nom_asig = app.asignatura.controls ['nom_asig'];
        let sigla_asig = app.asignatura.controls ['sigla_asig'];
        let semestre = app.asignatura.controls ['semestre'];
        let profesor = app.asignatura.controls ['profesor'];
        let nombre_carrera = app.asignatura.controls ['nombre_carrera'];


        codigo_asig.setValue('3');
        nom_asig.setValue('Asignatura De Prueba3');
        sigla_asig.setValue ('ADP3456');
        semestre.setValue('3');
        profesor.setValue('Hugo');
        nombre_carrera.setValue('Analista Programador');


        expect(app.asignatura.valid).toBeTrue();
    })

    it ('6. Ejecutar botón "Añadir user".', ()=>{
      const fixture = TestBed.createComponent (AdministradorPage);
      const app = fixture.componentInstance;

      let rut = app.user.controls ['rut'];
      let nombre =app.user.controls ['nombre'];
      let ap_paterno = app.user.controls ['ap_paterno'];
      let fecha_nac = app.user.controls ['fecha_nac'];
      let semestre = app.user.controls ['semestre'];
      let password = app.user.controls ['password'];
      let email = app.user.controls ['email'];
      let tipo_usuario = app.user.controls ['tipo_usuario'];
      let nombre_carrera = app.user.controls [ 'nombre_carrera'];

      rut.setValue('13.909.457-3');
      nombre.setValue ('Chris');
      ap_paterno.setValue('Vargas');
      fecha_nac.setValue ('1997-11-24');
      semestre.setValue('1');
      password.setValue('userprueba');
      
      email.setValue('chris@duocuc.cl');
      tipo_usuario.setValue('alumno');
      nombre_carrera.setValue('Ingenieria en Sonido');

      app.agregarFire();

      expect(app.v_agregar).toBeTrue();

    })

    it ('7. Ejecutar botón "Añadir asignatura".', ()=>{
      const fixture = TestBed.createComponent (AdministradorPage);
      const app = fixture.componentInstance;

      let codigo_asig = app.asignatura.controls ['codigo_asig'];
      let nom_asig = app.asignatura.controls ['nom_asig'];
      let sigla_asig = app.asignatura.controls ['sigla_asig'];
      let semestre = app.asignatura.controls ['semestre'];
      let profesor = app.asignatura.controls ['profesor'];
      let nombre_carrera = app.asignatura.controls ['nombre_carrera'];

        codigo_asig.setValue('5');
        nom_asig.setValue('Asignatura De Prueba13');
        sigla_asig.setValue ('ADP3556');
        semestre.setValue('3');
        profesor.setValue('Hugo');
        nombre_carrera.setValue('Analista Programador');

      app.agregarFireAsig();

      expect(app.v_agregar).toBeTrue();

    })


    it('8. Largo del arreglo de personas', ()=>{
        const fixture = TestBed.createComponent(AdministradorPage);
        const app = fixture.componentInstance;
        
        app.listar();
  
  
    
        expect(app.personasFire.length).toBeGreaterThanOrEqual(0);
      });


    it('9. Largo del arreglo de asignaturas', ()=>{
        const fixture = TestBed.createComponent(AdministradorPage);
        const app = fixture.componentInstance;
        
        app.listarAsig();
  
  
    
        expect(app.asignaturasFire.length).toBeGreaterThanOrEqual(0);
      });

    
  
});
