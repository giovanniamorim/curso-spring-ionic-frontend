import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {
      
      
      this.formGroup = this.formBuilder.group({
        nome: ['Juliana Paes', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['jujupaes@sis7.com.br', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['QE 40', [Validators.required]],
        numero : ['245', [Validators.required]],
        complemento : ['Apto 301', []],
        bairro : ['Guará II', []],
        cep : ['71070000', [Validators.required]],
        telefone1 : ['837261854', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]      
      });
    }

    ionViewDidLoad(){
      this.estadoService.findAll()
        .subscribe(response => {
          this.estados = response;
          this.formGroup.controls.estadoId.setValue(this.estados[0].id);
          this.updateCidades();
        },
        error => {});
    }
    
    updateCidades(){
      let estado_id = this.formGroup.value.estadoId;
      this.cidadeService.findAll(estado_id)
        .subscribe(response => {
          this.cidades = response;
          this.formGroup.controls.cidadeId.setValue(null);
    })
  }

    signupUser() {
      console.log("enviou o form");
    }

}
