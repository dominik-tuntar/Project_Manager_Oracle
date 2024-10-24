import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';  // PascalCase for interface/class
import { Service } from '../service';  // PascalCase for service
import { UserUpdateComponent } from '../user-update/user-update.component';
import { Custom_Attribute } from '../custom_attribute';
import { UserCreateComponent } from '../user-create/user-create.component';
import { CattributeCreateComponent } from '../cattribute-create/cattribute-create.component';
import { CattributeUpdateComponent } from '../cattribute-update/cattribute-update.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']  // Use 'styleUrls' (plural)
})
export class UsersComponent implements OnInit {
  title = 'Users';
  public employees: Employee[] = [];
  public custom_attributes: Custom_Attribute[] = [];
  public selectedUserInfo: Employee | null = null;
  public selectedCattInfo: Custom_Attribute | null = null;
  public filteredAttributes: any[] = [];
  public selectedUserId: number | null = null;
  public selectedCattId: number | null = null;
  public isLoading: boolean = false;
  public searchTerm: string = '';
  public filteredUsers: Employee[] = [];


  constructor(private service: Service) { }  // Use Service (PascalCase)

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.service.getAllUsers().subscribe(
      (response: Employee[]) => {  // Use Employee[] (PascalCase)
        this.employees = response;
        this.filteredUsers = [...this.employees];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getSelectedUserInfo(employee: Employee): void {
    if (employee && employee.ID_EMPLOYEE) { // Ensure the employee and ID_EMPLOYEE exist
      this.selectedUserId = employee.ID_EMPLOYEE;
      this.selectedUserInfo = { ...employee };
      this.getCustomAttributes('EMPLOYEE', employee.ID_EMPLOYEE);
    } else {
      console.error('Error: ID_EMPLOYEE is undefined for the selected user');
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

  public disableUser(id_employee: number | null): void {
    if (id_employee !== null) {  // Check if id_employee is not null
      this.service.disableUser(id_employee)
        .subscribe(
          (response: any) => {
            const index = this.employees.findIndex(emp => emp.ID_EMPLOYEE === id_employee);
            if (index > -1) {
              this.employees[index].STATUS = 0; // Assuming '0' indicates inactive
              this.filteredUsers = [...this.employees]; // Update the filtered list to reflect changes
            }
          },
          (error: any) => {
            console.error('Error disabling user:', error);
          }
        );
    } else {
      console.error('Invalid ID: id_employee is null');
    }
  }

  public enableUser(id_employee: number | null): void {
    if (id_employee !== null) {  // Check if id_employee is not null
      this.service.enableUser(id_employee)
        .subscribe(
          (response: any) => {
            const index = this.employees.findIndex(emp => emp.ID_EMPLOYEE === id_employee);
            if (index > -1) {
              this.employees[index].STATUS = 1; // Assuming '1' indicates active
              this.filteredUsers = [...this.employees]; // Update the filtered list to reflect changes
            }
          },
          (error: any) => {
            console.error('Error disabling user:', error);
          }
        );
    } else {
      console.error('Invalid ID: id_employee is null');
    }
  }

  public deleteCustomAttribute(id_c_attribute: number | null): void {
    if (id_c_attribute !== null) {  // Check if id_employee is not null
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
            console.error('Error disabling user:', error);
          }
        );
    } else {
      console.error('Invalid ID: id_employee is null');
    }
  }

  private filterAttributes(): void {
    this.filteredAttributes = this.custom_attributes.filter(attribute =>
      attribute.TABLE_NAME === 'EMPLOYEE' && attribute.TABLE_ROW === this.selectedUserId
    );
  }

  public filterUsers(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredUsers = this.employees.filter(employee =>
        employee.USERNAME.toLowerCase().includes(searchTermLower) ||
        employee.FULLNAME.toLowerCase().includes(searchTermLower)
      );
    } else {
      // If no search term, reset to full employee list
      this.filteredUsers = [...this.employees];
    }
  }


  @ViewChild('popupUpdate') popupUpdate!: UserUpdateComponent;
  @ViewChild('popupCreate') popupCreate!: UserCreateComponent;
  @ViewChild('popupCattUpdate') popupCattUpdate!: CattributeUpdateComponent;
  @ViewChild('popupCattCreate') popupCattCreate!: CattributeCreateComponent; // Reference to the user update popup component

  showUpdatePopup() {
    if (this.popupUpdate && this.selectedUserInfo) {
      this.popupUpdate.selectedUser = { ...this.selectedUserInfo }; // Clone the selectedUserInfo
      this.popupUpdate.open();
    } else {
      console.error('Error: No user selected or popupUpdate component is not ready');
    }
  }

  showCattCreatePopup() {
    if (this.popupCattCreate && this.selectedUserInfo) {
      this.popupCattCreate.currentContext = 'EMPLOYEE'; // Set context to EMPLOYEE
      this.popupCattCreate.selectedUser = { ...this.selectedUserInfo }; // Pass the selected user
      this.popupCattCreate.open(); // Open the popup
    } else {
      console.error('Error: No user selected or popupCattCreate component is not ready');
    }
  }

  showCattUpdatePopup() {
    if (this.popupCattUpdate && this.selectedCattInfo) {
      this.popupCattUpdate.selectedCatt = { ... this.selectedCattInfo };
      this.popupCattUpdate.open();
    }
  }

  // Show the create popup
  showCreatePopup() {
    if (this.popupCreate) {
      this.popupCreate.open();
    }
  }

  public onUserUpdated(updatedUser: Employee): void {
    const index = this.employees.findIndex(emp => emp.ID_EMPLOYEE === updatedUser.ID_EMPLOYEE);
    if (index > -1) {
      this.employees[index] = updatedUser;  // Update the employee in the list
      this.filteredUsers = [...this.employees];  // Update filtered list
    }
  }

  public onUserCreated(): void {
    this.getAllUsers();
  }

  public onCustomAttributeUpdated(updatedCatt: Custom_Attribute): void {
    // Find the index of the existing attribute and update it
    const index = this.custom_attributes.findIndex(catt => catt.ID_C_ATTRIBUTE === updatedCatt.ID_C_ATTRIBUTE);
    if (index !== -1) {
      this.custom_attributes[index] = updatedCatt;
      this.getCustomAttributes('EMPLOYEE', this.selectedUserId!);
    } 
  }

  public onCustomAttributeCreated(): void {
    this.getCustomAttributes('EMPLOYEE', this.selectedUserId!);
  }
}
