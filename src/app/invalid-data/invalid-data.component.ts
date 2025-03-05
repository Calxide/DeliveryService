import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-invalid-data',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './invalid-data.component.html',
  styleUrl: './invalid-data.component.css'
})
export class InvalidDataComponent {

}
