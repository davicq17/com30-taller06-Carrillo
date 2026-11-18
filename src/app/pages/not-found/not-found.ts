import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector:'app-not-found',
    imports: [RouterLink],
    standalone: true,
    templateUrl: './not-found.html',
    styleUrl: './not-found.css'
})
export class NotFound {
 readonly url = inject(Router).url;
}
