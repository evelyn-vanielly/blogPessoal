import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { TemaService } from '../service/tema.service';
import { PostagemService } from '../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from '../model/Tema';
import { error } from '@angular/compiler/src/util';



@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css']
})
export class PutPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaTemas: Tema[]
  Tema: Tema = new Tema()
  idTema: number
  idPost: number

constructor(
  private temaService: TemaService,
  private postagemService: PostagemService,
  private router: Router,
  private route: ActivatedRoute
) {}

ngOnInit(){ 
  window.scrollTo(0,0)
  this.idPost = this.route.snapshot.params["id"]
  this.findByIdPostagem(this.idPost)

  this.findAllTemas()
}

salvar(){
this.Tema.id = this.idTema
this.postagem.tema=this.Tema
this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) =>{
  this.postagem = resp
  this.router.navigate(['/feed'])
  alert ("Postagem alterada com sucesso")
}, err => {
  if (err.status == "500"){
    alert ('Preencha corretamente todos os campos')
  }
})
}

findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => this.Tema = resp)
}

findAllTemas(){
  this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
    this.listaTemas = resp
  })
}

findByIdPostagem(id:number){
  this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) =>{
    this.postagem = resp
  })
}

  }
