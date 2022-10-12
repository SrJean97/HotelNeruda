import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Factura } from '../Hotel_Neruda/models/Factura';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptionsPut = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  mod:Factura;  
  total = 0;
  subtotal = 0;
  fcts:Factura[] = [];
  fct = new Factura();
  baseUrl: string;
  searchText:string;
  sText:string;
  
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }
    
  get(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.baseUrl + 'api/FacturaControllers')
    .pipe(
        catchError(this.handleErrorService.handleError<Factura[]>('Consulta Factura', null))
    );
  }    

  /** GET Factura by identificacion. Will 404 if id not found */
  getId(id: number): Observable<Factura> {
    const url = `${this.baseUrl + 'api/FacturaControllers'}/${id}`;
      return this.http.get<Factura>(url, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<Factura>('Buscar Factura', null))
      );
  }

  post(cliente: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.baseUrl + 'api/FacturaControllers', cliente)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Factura>('Registrar Factura', null))
      );

  }

  update(cliente: Factura): Observable<Factura> {
    return this.http.put<Factura>(this.baseUrl + 'api/FacturaControllers/'+cliente.id, cliente)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Factura>('Registrar Factura', null))
      );

  }

  /** DELETE: delete the hero from the server */
  delete (Factura: Factura | number): Observable<number> {
    const id = typeof Factura === 'number' ? Factura : Factura.id;
    return this.http.delete<number>(this.baseUrl + 'api/FacturaControllers/'+ id)
    .pipe(
      catchError(this.handleErrorService.handleError<number>('Elimiar Factura', null))
    );
  }

}
