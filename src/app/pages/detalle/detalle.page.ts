import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() detalles: any

  constructor() { }

  resolverImagen() {
    return `assets/${this.detalles.weather}.png`;
  }

  ngOnInit(): void {
  }

}
