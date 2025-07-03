import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  formTitle = 'Registrar nuevo empleado';
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      cargo: [''],
      department: [''],
      phone: [''],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.formTitle = 'Editar empleado';
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
      },
      error: (err) => {
        console.error('Error al cargar un empleado:', err);
        this.errorMessage = 'No se pudo obtener la informacion del empleado.';
        this.router.navigate(['/employees']);
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.employeeForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos y válidos.';
      return;
    }

    const employee: Employee = this.employeeForm.value;

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(employee).subscribe({
        next: () => {
          alert('Empleado actualizado con exito!');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error al actualizar el empleado:', err);
          this.errorMessage = 'Error al actualizar el empleado. confrima la existencia del id.';
        }
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          alert('Empleado agregado con exito!');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error al agregar el empleado:', err);
          this.errorMessage = 'Error al agregar el empleado. Intenta de nuevo.';
        }
      });
    }
  }

}
