import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ApiService } from '@@shared';
@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
})
export class DemoComponent {
  data: any = [];
  tableColumns: Column[] = [
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
  ];
  constructor(private apiService: ApiService) {}

  getData() {
    this.apiService
      .postApi('demo', {}, './assets/mock/api/v1/json-file/data.json')
      .subscribe((res) => {
        this.data = res;
      });
  }
}

interface Column {
  field: string;
  header: string;
}
