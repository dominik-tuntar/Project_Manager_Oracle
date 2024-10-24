import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../service';
import { Custom_Attribute } from '../custom_attribute';
import { Client } from '../client'; // Import the Client model
import { Employee } from '../employee'; // Import the Employee model

@Component({
  selector: 'app-cattribute-create',
  templateUrl: './cattribute-create.component.html',
  styleUrls: ['./cattribute-create.component.css']
})
export class CattributeCreateComponent {
  @Input() title: string = '';       // Title input for the custom attribute
  @Input() content: string = '';     // Content input for the custom attribute
  @Input() selectedClient: Client | null = null; // Selected Client
  @Input() selectedUser: Employee | null = null; // Selected Employee
  @Output() customAttributeCreated = new EventEmitter<Custom_Attribute>();

  isOpen: boolean = false; // Control whether the modal is open or closed
  currentContext: 'CLIENT' | 'EMPLOYEE' = 'EMPLOYEE'; // Default context

  constructor(private service: Service) {}

  open() {
    this.isOpen = true; // Open the modal
  }

  close() {
    this.isOpen = false; // Close the modal
  }

  public createCustomAttribute(): void {
    const [table_name, table_row] = this.getCreateParameters();
    if ((this.selectedClient || this.selectedUser && this.title && this.content)) {
      this.service.createCustomAttribute(table_name, table_row, this.title, this.content)
        .subscribe(
          (response: any) => {
            this.customAttributeCreated.emit(response);
            this.close();
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );
    }
  }

  // New method to determine parameters based on context
  public getCreateParameters(): [string, number] {
    if (this.currentContext === 'CLIENT' && this.selectedClient) {
      return ['CLIENT', this.selectedClient.ID_CLIENT];
    } else if (this.currentContext === 'EMPLOYEE' && this.selectedUser) {
      return ['EMPLOYEE', this.selectedUser.ID_EMPLOYEE];
    } else {
      return ['DEFAULT', 0];
    } 
  }
}
