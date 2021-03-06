import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { retry, map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta,
              private _medicoService: MedicoService) {

    this.getDataRoute()
    .subscribe (data => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'descripion',
        content: this.titulo
      };
      this.meta.updateTag (metaTag);

    });


  }

  ngOnInit() {

  }

  getDataRoute() {
    return this.router.events.pipe (
      filter (evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )

    );

  }

}
