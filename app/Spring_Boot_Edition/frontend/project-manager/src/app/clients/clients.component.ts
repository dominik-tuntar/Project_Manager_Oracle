import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../client';  // Use Client (PascalCase for the interface/class)
import { Service } from '../service';  // PascalCase for service
import { Custom_Attribute } from '../custom_attribute';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import { CattributeCreateComponent } from '../cattribute-create/cattribute-create.component';
import { CattributeUpdateComponent } from '../cattribute-update/cattribute-update.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']  // Use 'styleUrls' (plural)
})
export class ClientsComponent implements OnInit {
  title = 'Clients';
  public clients: Client[] = [];
  public custom_attributes: Custom_Attribute[] = [];
  public selectedClientInfo: Client | null = null;
  public selectedCattInfo: Custom_Attribute | null = null;
  public filteredAttributes: any[] = [];
  public selectedClientId: number | null = null;
  public selectedCattId: number | null = null;
  public isLoading: boolean = false;
  public searchTerm: string = '';
  public filteredClients: Client[] = [];
  public isCreateClientOpen = false;

  constructor(private service: Service) { }  // Use Service (PascalCase)

  ngOnInit() {
    this.getAllClients();
  }

  public getAllClients(): void {
    this.service.getAllClients().subscribe(
      (response: Client[]) => {  // Use Client[] (PascalCase)
        this.clients = response;
        this.filteredClients = [...this.clients];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getSelectedClientInfo(client: Client): void {
    if (client && client.ID_CLIENT) {
      this.selectedClientId = client.ID_CLIENT;
    this.selectedClientInfo = { ...client };
    this.getCustomAttributes('CLIENT', client.ID_CLIENT);
    } else {
      console.error('Error: ID_CLIENT is undefined for the selected client');
    }
  }

  public getSelectedCattInfo(custom_attribute: Custom_Attribute): void {
    this.selectedCattId = custom_attribute.ID_C_ATTRIBUTE;
    this.selectedCattInfo = { ...custom_attribute };
  }

  public getCustomAttributes(table_name: string, table_row: number): void {
    this.service.getCustomAttributes(table_name, table_row)
      .subscribe(
        (response: any) => {
          this.custom_attributes = response;
          this.filterAttributes();  // Assign the response data to the variable
        },
        (error: any) => {
          console.error('Error fetching custom attributes:', error);
        }
      );
  }

  public deleteCustomAttribute(id_c_attribute: number | null): void {
    if (id_c_attribute !== null) {  // Check if id_c_attribute is not null
      this.service.deleteCustomAttribute(id_c_attribute)
        .subscribe(
          (response: any) => {
            const index = this.custom_attributes.findIndex(attr => attr.ID_C_ATTRIBUTE === id_c_attribute);
            if (index > -1) {
              this.custom_attributes.splice(index, 1); // Remove the attribute from the array
              this.filterAttributes(); // Update the filtered attributes to reflect changes
            }
          },
          (error: any) => {
            console.error('Error deleting custom attribute:', error);
          }
        );
    } else {
      console.error('Invalid ID: id_c_attribute is null');
    }
  }

  public deleteClient(id_client: number | null): void {
    if (id_client !== null) {  // Check if id_client is not null
      this.service.deleteClient(id_client).subscribe(
        (response: any) => {
          const index = this.clients.findIndex(client => client.ID_CLIENT === id_client);
          if (index > -1) {
            this.clients.splice(index, 1); // Remove the client from the array
            this.filteredClients = [...this.clients]; // Update the filtered list
          }
        },
        (error: any) => {
          console.error('Error deleting client:', error);
        }
      );
    } else {
      console.error('Invalid ID: id_client is null');
    }
  }

  private filterAttributes(): void {
    this.filteredAttributes = this.custom_attributes.filter(attribute =>
      attribute.TABLE_NAME === 'CLIENT' && attribute.TABLE_ROW === this.selectedClientId
    );
  }

  public filterClients(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        client.NAME_.toLowerCase().includes(searchTermLower) ||
        client.EMAIL.toLowerCase().includes(searchTermLower)
      );
    } else {
      // If no search term, reset to full client list
      this.filteredClients = [...this.clients];
    }
  }

  @ViewChild('popupCreate') popupCreate!: ClientCreateComponent;
  @ViewChild('popupUpdate') popupUpdate!: ClientUpdateComponent;
  @ViewChild('popupCattCreate') popupCattCreate!: CattributeCreateComponent;
  @ViewChild('popupCattUpdate') popupCattUpdate!: CattributeUpdateComponent;
  showCreatePopup() {
    if (this.popupCreate) {
      this.popupCreate.open();
    }
  }

  public onClientCreated(): void {
    this.getAllClients();
  }

  showUpdatePopup() {
    if (this.popupUpdate && this.selectedClientInfo) {
      this.popupUpdate.selectedClient = { ...this.selectedClientInfo};
      this.popupUpdate.open();
    } else {
      console.error('Error: No client selected or popupUpdate component is not ready');
    }
  }

  public onClientUpdated(updatedClient: Client): void {
    const index = this.clients.findIndex(c => c.ID_CLIENT === updatedClient.ID_CLIENT);
    if (index > -1) {
      this.clients[index] = updatedClient; // Update the client in the list
      this.filteredClients = [...this.clients]; // Update filtered list
    } 
  }

  showCattCreatePopup() {
    if (this.popupCattCreate && this.selectedClientInfo) {
      this.popupCattCreate.currentContext = 'CLIENT';
      this.popupCattCreate.selectedClient = { ...this.selectedClientInfo};
      this.popupCattCreate.open();
    } else {
      console.error('Error: No client selected or popupCattCreate component is not ready');
    }
  }

  public onCustomAttributeCreated(): void {
    this.getCustomAttributes('CLIENT', this.selectedClientId!);
  }

  showCattUpdatePopup() {
    if (this.popupCattUpdate && this.selectedCattInfo) {
      this.popupCattUpdate.selectedCatt = { ...this.selectedCattInfo};
      this.popupCattUpdate.open();
    }
  }

  public onCustomAttributeUpdated(updatedCatt: Custom_Attribute): void {
    // Find the index of the existing attribute and update it
    const index = this.custom_attributes.findIndex(catt => catt.ID_C_ATTRIBUTE === updatedCatt.ID_C_ATTRIBUTE);
    if (index !== -1) {
      this.custom_attributes[index] = updatedCatt;
      this.getCustomAttributes('CLIENT', this.selectedClientId!); // Update the existing attribute
    }
  }
}
