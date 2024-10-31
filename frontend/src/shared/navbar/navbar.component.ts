import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    InputTextModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

public items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dressing',
      },
      {
        label: 'Nous',
      },
      {
        label: 'Contact',
      },
    ]
  }
}
