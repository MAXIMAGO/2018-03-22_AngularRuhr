import { FilmsService } from "./shared/films.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Film } from "./shared/film";
import { map, timeout } from "rxjs/operators";
import { FilmsResponse } from "./shared/films-response";

import { CircuitBreaker } from "./circuit-breaker/circuit-breaker";
import { CircuitBreakerState } from "./circuit-breaker/circuit-breaker-state";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    cb: CircuitBreaker;
    title = "Star Wars API";
    films: Observable<Film[]>;

    constructor(private filmsService: FilmsService) { }

    ngOnInit(): void {
        this.reload();
        this.cb = this.filmsService.cb;
    }

    reload() {
        this.films = this.filmsService.getFilms()
            .pipe(
                map((response: FilmsResponse) => response.results)
            );
    }

    get stateText(): string {
        return CircuitBreakerState[this.cb.state];
    }
}
