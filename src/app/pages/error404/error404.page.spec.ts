import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment.prod';

import { Error404Page } from './error404.page';

describe('Pruebas unitarias Error404', () => {
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
          Error404Page
        ]
  
      }).compileComponents();
    });
  
    it('1. Carga de la página error404', ()=>{
      const fixture = TestBed.createComponent(Error404Page);
      const app = fixture.componentInstance;
  
      expect(app).toBeTruthy();
    })

  });