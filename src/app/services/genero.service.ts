import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IListaGenero } from '../models/IGenero.module';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  public language = 'PT-br';
  private apiUrl = 'https://api.themoviedb.org/3/';
  private key = '?api_key=3f051529a2acc87387dc40a3727be550';

  constructor(private http: HttpClient, private toastController: ToastController) { }

  buscarGeneros(): Observable<IListaGenero> {
    const url = `${this.apiUrl}genre/movie/list${this.key}&language=${this.language}`;
    return this.http.get<IListaGenero>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.presentToast(erro))
    );
  }

  async presentToast(error) {
    const toast = await this.toastController.create({
      message: 'Erro buscar generos',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}
