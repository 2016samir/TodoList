import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from './core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./features/layout/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./features/layout/footer/footer.component";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

}
