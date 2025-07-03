import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  error: string | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.error = null;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los empleados:', err);
        this.error = 'No se pudieron cargar los empleados.';
        this.loading = false;
      }
    });
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit-employee', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log('empleado eliminado con exito.');
          this.loadEmployees(); // Recarga la lista después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar empleado:', err);
          this.error = 'No se pudo eliminar el empleado.';
        }
      });
    }
  }

}