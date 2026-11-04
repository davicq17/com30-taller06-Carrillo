import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLinkWithHref, Router } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLinkActive, RouterLinkWithHref],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('com30-taller06-Carrillo');
  private router = inject(Router);

  rol = signal('admin');
  readonly menu= [
    {label: 'Lista de Lugares', route: 'places',rol: 'admin'},
    {label: 'Reservaciones', route:'reservations', rol: 'admin'},
    {label: 'Lugares', route:'client', rol:'client'},
    {label: 'Mis reservas', route:'my-reservations', rol: 'client'}
  ];


  visibles = computed(() => {
    return this.menu.filter((i) => i.rol === this.rol());
  })

  change(rol: string){
    if(rol === 'admin'){
      this.rol.set('client');
      this.router.navigate(['client']);
    }else{
      this.rol.set('admin');
      this.router.navigate(['places']);
    }

    console.log("rol:"+ this.rol());
  }

}
