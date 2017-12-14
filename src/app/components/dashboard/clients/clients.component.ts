import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  p: number = 1;
  id: string;
  client: Client;
  clients: any[];
  userFilter: any = { firstName: '', lastName: '' };

  //sorting
  key: string = 'firstName'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse; 
  }

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    //Get Id from url
    this.id = this.route.snapshot.params['id'];
    // console.log("From params: "+this.id);
    //Get client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client =  client;
      // console.log(this.client);
      // console.log(this.id);
    })

    this.clientService.getClients().subscribe(clients => {
      // console.log(clients);
      this.clients = clients;
    })
    

  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?" +this.id )){
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client removed', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/dashboard']);
    }
  }

  //With Passed in id 
  //onDeleteClick(id: string){
  //   if(confirm("Are you sure to delete?" )){
  //     this.clientService.deleteClient(id);
  //     this.flashMessagesService.show('Client removed ', {
  //       cssClass:'alert-success', timeout: 4000
  //     });
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

}
