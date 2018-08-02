import { Component, OnInit } from '@angular/core';
import { resolve } from 'path';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then (
      mensaje => console.log ('Termino', mensaje)
    )
    .catch ( error => console.error ('Error en la promesa', error));
  }

  contarTres (): Promise<boolean> {

    return new Promise ( (result, reject) => {

      let contador = 0;

      let intervalo = setInterval ( () => {

        contador += 1;
        console.log (contador);

        if ( contador === 3 ) {
          result(true);
          clearInterval (intervalo);
        }

      }, 1000 );
    });

}

  ngOnInit() {
  }

}
