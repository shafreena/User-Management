import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { selectUsers } from '../states/users/users.selector';
import { AppState } from '../states/app.state';
import { UserType } from '../states/users/users.reducer';
import { saveUser, setInitialUserList } from '../states/users/users.action';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserTableComponent {
  userData: UserType[] = [];
  columnsToDisplay = ['firstName', 'lastName', 'age', 'phone'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  expandedElement!: UserType | null;
  contactForm!: FormGroup;
  spin = false;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private service: UserService) {
    this.getUserData();
    this.createContactForm();

  }

  getUserData() {
    this.service.getUserData().subscribe({
      next: (data: Array<UserType>) => {
        this.store.dispatch(setInitialUserList({ userList: data }));
        console.log(new Date() + ": " + 'Data fetched from DUMMY JSON', data);
      },
      error: (error) => { this.userData = []; console.log('Error', error) },
      complete: () => {
        this.store.select(selectUsers).subscribe(data => { this.userData = data });
      }
    })
  }
  createContactForm() {
    this.contactForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      phone: [''],
      id: ['']
    });
  }

  expandClick(element: UserType) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.contactForm.setValue({ firstName: element.firstName, lastName: element.lastName, age: element.age, phone: element.phone, id: element.id });
  }
  onSave() {
    this.spin = true;
    setTimeout(() => {
      this.store.dispatch(saveUser(this.contactForm.value));
      this.spin = false;
    }, 5000)


  }
  onCancel() {
    this.expandedElement = null;

  }
}



