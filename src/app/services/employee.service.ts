import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7286/api/employee';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee>{
    const {...employeeWithoutId} = employee;
    return this.http.post<Employee>(this.apiUrl, employeeWithoutId);
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
