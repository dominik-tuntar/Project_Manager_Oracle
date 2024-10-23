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

  public createCustomAttribute(table_name: string, table_row: number, title: string, content: string): void {
    if ((this.selectedClient || this.selectedUser)) {
      this.service.createCustomAttribute(table_name, table_row, title, content)
        .subscribe(
          (response: Custom_Attribute) => {
            const createdCustomAttribute: Custom_Attribute = {
              ID_C_ATTRIBUTE: response.ID_C_ATTRIBUTE, // Use the actual ID returned from the response
              TABLE_NAME: table_name,
              TABLE_ROW: table_row,
              TITLE: title,
              CONTENT_: content,
            };

            this.customAttributeCreated.emit(createdCustomAttribute);
            this.close();
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );
    }
  }

  // New method to determine parameters based on context
  public getCreateParameters(): [string, number, string, string] {
    const defaultTitle = '';
    const defaultContent = '';

    if (this.currentContext === 'CLIENT' && this.selectedClient) {
      return ['CLIENT', this.selectedClient.ID_CLIENT, this.title, this.content];
    } else if (this.currentContext === 'EMPLOYEE' && this.selectedUser) {
      return ['EMPLOYEE', this.selectedUser.ID_EMPLOYEE, this.title, this.content];
    }
    
    return ['DEFAULT', 0, defaultTitle, defaultContent]; 
  }
}
