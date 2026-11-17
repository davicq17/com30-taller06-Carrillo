import { Component,computed, input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlaceService } from "../../services/place.service";
import { RouterLink} from "@angular/router";

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-panel-place',
  styleUrl: './panel-place.css',
  templateUrl: './panel-place.html',
})
export class PanelPlace {
    private readonly placeService = inject(PlaceService);

    readonly id = input.required<string>();
    readonly place = computed(() =>
        this.placeService.obtener(this.id())
    );
}