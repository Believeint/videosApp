import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public alertController: AlertController, public toastController: ToastController) {}

  async exibirAlertaFavoritar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Deseja favoritar <strong>filme</strong>!!!',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancelou confirmação: blah' + console.log(this.alertController));
        }
      }, {
        text: 'Sim',
        handler: () => {
          this.apresentarToastFavorito();
          console.log('Confirmou');
        }
      }],
    });

    await alert.present();
  }

  async apresentarToastFavorito() {
    const toast = await this.toastController.create({
      message: 'Serie favoritada.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
