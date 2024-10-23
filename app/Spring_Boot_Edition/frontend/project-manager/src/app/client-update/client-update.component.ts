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
    // Assume service is available to update client
      this.service.updateClient(id_client, name, email).subscribe(
        (response: any) => {
          if(this.selectedClient) {
            this.selectedClient.NAME_ = name;
            this.selectedClient.EMAIL = email;
            this.clientUpdated.emit(this.selectedClient);
          }
          this.close();
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
