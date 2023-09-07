import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ApiPageRoutingModule } from './api-routing.module';

import { ApiPage } from './api.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ApiPage]
})
export class ApiPageModule {}
