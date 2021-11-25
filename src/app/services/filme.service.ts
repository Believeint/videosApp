import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IListaFilmes } from '../models/IFilmeApi.model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  public region = 'BR';
  public language = 'PT-br';
  private apiUrl = 'https://api.themoviedb.org/3/';
  private key = '?api_key=3f051529a2acc87387dc40a3727be550';

  constructor(private http: HttpClient, private toastController: ToastController) {
    console.log(this.buscarFilmes('Mortal Kombat'));
   }

  buscarFilmes(busca: string): Observable<IListaFilmes> {
    const url = `${this.apiUrl}search/movie${this.key}&language=${this.language}&region=${this.region}&query=${busca}`;
    return this.http.get<IListaFilmes>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.presentToast(erro))
    );
  }

  async presentToast(error) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar api',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}
