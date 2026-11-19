import { Routes } from "@angular/router";
import { Panel } from "./panel/panel";

export const parcial2Routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import ('./parcial-form/parcial-form')
                .then(m => m.ParcialForm),
        title: 'parcial2',
        children: [
            {
                path: 'producto/:codigo',
                component: Panel,
                outlet: 'panel',
                title: 'Detalle · producto',
                data: {volver: '/parcial2'}
            }
        ]
    }
];
