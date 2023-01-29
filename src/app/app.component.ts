
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ang15crud';


  displayedColumns: string[] = ['empName', 'designation', 'dateofjoining', 'gender','age','description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(public dialog: MatDialog, private api:ApiService) {}
  ngOnInit(): void {
this.getAllEmployees();
  }

  openDialog() {
    this.dialog.open(EmployeeComponent, {
     width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val==='save')
{
  this.getAllEmployees();
}    });
  }

  editEmployee(row:any){
    this.dialog.open(EmployeeComponent,{
      width:'35%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllEmployees();
      }
    })
  }
  getAllEmployees(){
    this.api.getEmp()
    .subscribe({
      next:(res)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    error:(err)=>{
      alert("Error fetching data");
    }
    
  })

  
}

deleteEmployee(id:number){
  this.api.deleteEmp(id)
    .subscribe({
      next:(res)=>{
     alert("Employee Deleted Successfully");
     this.getAllEmployees();
    },
    error:(err)=>{
      alert("Error Deleting data");
    }
    
  })

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
