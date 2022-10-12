import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HandleHttpErrorService } from "../@base/handle-http-error.service";
import { Persona } from "../Hotel_Neruda/models/persona";

@Injectable({
    providedIn: 'root'
})
export class ServicioAutenticacion {
    private currentUserSubject: BehaviorSubject<Persona>;
    public currentUser: Observable<Persona>;
    baseUrl: string;

    constructor(
        private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
        private handleErrorService: HandleHttpErrorService) {
        this.currentUserSubject = new BehaviorSubject<Persona>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.baseUrl = baseUrl;
    }

    public get currentUserValue(): Persona {
        return this.currentUserSubject.value;
    }

    iniciarSesion(id, pass) {
        return this.http.post<any>(this.baseUrl + 'api/Login', { id, pass })
            .pipe(map(Persona => {
                localStorage.setItem('currentUser', JSON.stringify(Persona));
                this.currentUserSubject.next(Persona);
                return Persona;
            }));
    }

    cerrarSesion() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}