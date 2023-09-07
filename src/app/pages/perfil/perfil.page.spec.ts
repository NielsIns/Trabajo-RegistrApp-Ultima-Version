import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment.prod';

import { PerfilPage } from './perfil.page';

describe('Pruebas unitarias Perfil', () => {
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
          PerfilPage
        ]
  
      }).compileComponents();
    });
  
    it('1. Carga de la página perfil', ()=>{
      const fixture = TestBed.createComponent(PerfilPage);
      const app = fixture.componentInstance;
  
      expect(app).toBeTruthy();
    })

  });
