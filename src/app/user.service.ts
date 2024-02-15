import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private url = 'https://dummyjson.com/user';
  getUserData() {
    console.log(new Date() + ": " + 'Fetching data from DUMMY JSON');
    return this.http.get(this.url).pipe(map((res: any) =>
      res.users.map((user: any) => (
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          phone: user.phone
        }
      ))
    ));
  }
}
