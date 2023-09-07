import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment.prod';

import { ProfesorPage } from './profesor.page';
import { DatePipe } from '@angular/common';

describe('Pruebas unitarias profesor', () => {
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
        providers: [
            DatePipe
        ],
        declarations: [
          ProfesorPage
        ]
  
      }).compileComponents();
    });
  
    it('1. Carga de la página profesor', ()=>{
      const fixture = TestBed.createComponent(ProfesorPage);
      const app = fixture.componentInstance;
  
      expect(app).toBeTruthy();
    })
  
    it ('2. Formulario invalido', ()=>{
        const fixture = TestBed.createComponent (ProfesorPage);
        const app = fixture.componentInstance;
    
       
        let cod_asistencia = app.asistencia.controls ['cod_asistencia'];
        let cod_asignatura = app.asistencia.controls ['cod_asignatura'];
        let horario = app.asistencia.controls ['horario'];
        let alumnos = app.asistencia.controls ['alumnos'];
        
       
    
        cod_asistencia.setValue('asdfjknasfdn');
        cod_asignatura.setValue('y');
        horario.setValue(new Date())
        alumnos.setValue(null)
        
    
    
        expect(app.asistencia.valid).toBeFalse();
    })
    
    
    it('3. Formulario válido',()=>{
        const fixture = TestBed.createComponent(ProfesorPage);
        const app = fixture.componentInstance;
    
        let cod_asistencia = app.asistencia.controls ['cod_asistencia'];
        let cod_asignatura = app.asistencia.controls ['cod_asignatura'];
        let horario = app.asistencia.controls ['horario'];
        let alumnos = app.asistencia.controls ['alumnos'];
        
       
    
        cod_asistencia.setValue('asdfjknasfdn');
        cod_asignatura.setValue('asdjkfn23y');
        horario.setValue(new Date())
        alumnos.setValue(null)
    
        expect(app.asistencia.valid).toBeTrue();
    })

    it ('4. Ejecutar botón "Mostrar Asistencia".', ()=>{
        const fixture = TestBed.createComponent (ProfesorPage);
        const app = fixture.componentInstance;
  
        let cod_asistencia = app.asistencia.controls ['cod_asistencia'];
        let cod_asignatura = app.asistencia.controls ['cod_asignatura'];
        let horario = app.asistencia.controls ['horario'];
        let alumnos = app.asistencia.controls ['alumnos'];
        
       
    
        cod_asistencia.setValue('asdfjknasfdn');
        cod_asignatura.setValue('asdjkfn23y');
        horario.setValue(new Date())
        alumnos.setValue(null)
  
        app.agregarFireAsist();
  
        expect(app.v_agregar).toBeTrue();
  
      })
    
    
    it('5. Largo del arreglo de personas', ()=>{
        const fixture = TestBed.createComponent(ProfesorPage);
        const app = fixture.componentInstance;
        
        app.listarAsist(); 
    
    
    
        expect(app.asistenciasFire.length).toBeGreaterThanOrEqual(0);
    });

  });
