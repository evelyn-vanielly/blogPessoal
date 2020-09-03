import { Component, OnInit } from '@angular/core';
import { Postagem } from './../model/Postagem';
import { Tema } from './../model/Tema';
import { PostagemService } from './../service/postagem.service';
import { TemaService } from './../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

postagem: Postagem = new Postagem()
listaPostagens: Postagem[]

Tema: Tema = new Tema()
listaTemas: Tema[]
idTema: number
nomeTema: string

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService
     ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.findAllPostagens()
    this.findAllTemas()
  }

publicar(){
  this.Tema.id = this.idTema
  this.postagem.tema = this.Tema

  if (this.postagem.titulo == null || this.postagem.tema == null || this.postagem.texto == null) {
    alert ('Preencha todos os campos corretamente')
  } else {
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.postagem = new Postagem()
      alert ('Postado com sucesso')
      this.findAllPostagens()
    })
  }
}


findAllPostagens(){
 this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
   this.listaPostagens = resp
 })
}

findAllTemas(){
  this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
    this.listaTemas = resp
  })

}

 findByIdTema(){
   this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => this.Tema = resp)
     
   }
 }




