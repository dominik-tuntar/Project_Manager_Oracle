// src/app/client-create/client-create.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../service';
import { Client } from '../client';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {
  @Input() title: string = 'Default Title';
  @Input() message: string = 'Default message.';
  @Output() clientCreated = new EventEmitter<Client>();
  public emailError: string | null = null;

  isOpen: boolean = false;

  constructor(private service: Service) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.emailError = null; // Reset error on close
  }

  public createClient(name: string, email: string): void {
    // Call the service to create a new client using destructured parameters
    this.service.createClient(name, email).subscribe(
      (response: Client) => {
        const createdClient: Client = {
          ID_CLIENT: 0, // Placeholder until actual ID is received
          NAME_: name,
          EMAIL: email,
        };
        this.clientCreated.emit(createdClient); // Emit newly created client
        this.close(); // Close the modal
      },
      (error: any) => {
        console.error('Error creating client:', error);
      }
    );
  }
}
