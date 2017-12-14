import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../../models/Client';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnEdit: boolean = true;
  age:number;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) {

   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] 

    //get client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

   }

   onSubmit({value, valid} : {value: Client, valid: boolean}){
    console.log(value,valid);
    
    if (!valid) {
      this.flashMessagesService.show('Please fill in all the fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['dashboard/edit-client' + this.id])
    }else{
      //update Client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client has been updated', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/'+this.id])

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
    
  } 
}
