import { Routes } from "@angular/router";

export const parcial2Routes: Routes = [
    {path: 'parcialForm',
        loadComponent: () =>
            import ('./parcial-form/parcial-form')
        .then(m => m.ParcialForm),
        title: 'parcialForm'
     }
]