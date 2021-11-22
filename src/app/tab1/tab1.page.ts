import { Router } from '@angular/router';
import { DadosService } from './../services/dados.service';
import { IFilmes } from './../models/IFilmes.module';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  titulo = 'Vídeos';

  listaVideos: IFilmes[] = [
    {
      nome: 'Mortal Kombat(2021)',
      lancamento: '15/04/2021',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/44aCR6cjH0FbzW6PMw3Ega178iW.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat',
    },
    {
      nome: 'Liga da Justiça de Zack Snyder (2021)',
      lancamento: '18/03/2021',
      duracao: '4h 2m',
      classificacao: 76,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ArWn6gCi61b3b3hclD2L0LOk66k.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura', 'Ficção científica'],
      pagina: '/liga-justica',
    },
  ];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public route: Router
  ) {}

  exibirFilme(filme: IFilmes)
  {
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavoritar(): Promise<void>
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Deseja favoritar <strong>filme</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log(
              'Cancelou confirma��o: blah' + console.log(this.alertController)
            );
          },
        },
        {
          text: 'Sim',
          handler: () => {
            this.apresentarToastFavorito();
            console.log('Confirmou');
          },
        },
      ],
    });

    await alert.present();
  }

  async apresentarToastFavorito() {
    const toast = await this.toastController.create({
      message: 'Serie favoritada.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}
