
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs/internal/Subscription';







@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})

export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor () {



    this.subscription = this.regresaObservable()
    .subscribe (
      numero => console.log ('Subs', numero),
      error => console.log ('Error desde el  obs', error),
      () => console.log ('El observador termino!')
    );


  }

  regresaObservable (): Observable<any> {

    return  new Observable ( (observer: Subscriber<any>) => {

      let contador = 0;
      let intervalo = setInterval ( () => {
          contador += 1;

          const salida = {
            valor: contador
          };
          observer.next ( salida );

          // if ( contador === 3 ) {
          //   clearInterval (intervalo);
          //   observer.complete();
          // }

          // if ( contador === 2 ) {
          //   // clearInterval (intervalo);
          //   observer.error ('Ausilio!');
          // }

      }, 1000 );
    }).pipe (
      map ( resp => resp.valor),
      filter ((valor, index ) => {

        if ( valor % 2 === 1) {
          return true;
        } else {
          return false;
        }
      }
    )
    );
  }

  ngOnDestroy() {
    console.log ('La página se va a cerrar');
    this.subscription.unsubscribe();
  }



  ngOnInit () {

  }

}
