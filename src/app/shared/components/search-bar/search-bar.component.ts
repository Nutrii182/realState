import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  readonly operationOptions = ['Operación 1', 'Operación 2'];
  readonly propertyOptions = ['Inmueble 1', 'Inmueble 2'];
  readonly cityOptions = ['Ciudad 1', 'Ciudad 2'];
  readonly zoneOptions = ['Zona 1', 'Zona 2'];

  selectedOperation = 'Venta';
  selectedProperty = 'Todos los tipos';
  selectedCity = 'Seleccionar Ciudad';
  selectedZone = 'Todas las zonas';
}
