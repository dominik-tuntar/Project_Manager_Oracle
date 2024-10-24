import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../client'; // Assuming Client interface is defined
import { Service } from '../service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent {
  @Input() selectedClient: Client | null = null;
  @Output() clientUpdated = new EventEmitter<Client>();
  isOpen: boolean = false;

  constructor(private service: Service) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  updateClient(id_client: number, name: string, email: string): void {
    if(this.selectedClient && this.selectedClient.ID_CLIENT) {
      const id_client = this.selectedClient.ID_CLIENT;
      this.service.updateClient(id_client, name, email).subscribe(
        (response: any) => {
          if(this.selectedClient) {
            this.selectedClient.NAME_ = name;
            this.selectedClient.EMAIL = email;
            this.clientUpdated.emit(this.selectedClient);
            this.close();
          } else {
            console.error('Error: selectedClient is null after update');
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Error: selectedClient or ID_CLIENT is undefined');
    }   
  }
}
