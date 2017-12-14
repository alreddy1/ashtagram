import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  };
  age:number;

  disableBalanceOnAdd: boolean = false;

  constructor( 
    private flashMessagesService: FlashMessagesService , 
    private router: Router,
    private clientService: ClientService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
    // this.today = new Date() ;
    // console.log('Today : ' +this.today);
  }

  onSubmit({value, valid} : {value: Client, valid: boolean}){
    console.log(value,valid);
    if(this.disableBalanceOnAdd){
      value.balance=0;
    }
    if (!valid) {
      this.flashMessagesService.show('Please fill in all the fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['dashboard/add-client'])
    }else{
      //Add new Client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New Client has been added', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['dashboard'])

    }

  }

  fireEvent(dtBorn){
    var effectiveYear;
    var dtCur = new Date();    // let today = new Date().toISOString().slice(0, 10);
    console.log('Today : ' +dtCur);
    //Fortmat DOB : YYYY-MM-DD to MON-DD-yyyy
    var formattedDob = new Date (dtBorn);
    console.log('Formatted DOB : ' +formattedDob);

    var dayDiff = dtCur.getDate()-formattedDob.getDate();
    var yearDiff = dtCur.getFullYear()-formattedDob.getFullYear();
    effectiveYear = yearDiff;
   
    if(dtCur.getMonth() <= formattedDob.getMonth()){
      if(dayDiff < 0){
        effectiveYear = effectiveYear - 1;
      }
    } 	
    
    console.log('Age ' +effectiveYear);

    this.age= effectiveYear;
    console.log('Age ' +this.age);
    
    // alert(effectiveYear);
  } 

}
