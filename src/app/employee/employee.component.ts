import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MatDialogState, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{


genderlist=["Male","Female"]
empForm !: FormGroup;
actionbtn: string ="Save"
constructor(private formBuilder: FormBuilder,private api:ApiService,
  @Inject(MAT_DIALOG_DATA) public editData:any,
  private dialogRef:MatDialogRef<EmployeeComponent>){}
ngOnInit(): void{
  this.empForm=this.formBuilder.group({
    empName:['',Validators.required],
    designation:['',Validators.required],
   dateofjoining:['',Validators.required],
   gender:['',Validators.required],
    age:['',Validators.required],
    description:['',Validators.required],
  });

  if(this.editData){
    this.actionbtn ="Update";
    this.empForm.controls['empName'].setValue(this.editData.empName);
    this.empForm.controls['designation'].setValue(this.editData.designation);
    this.empForm.controls['dateofjoining'].setValue(this.editData.dateofjoining);

    this.empForm.controls['gender'].setValue(this.editData.gender);

    this.empForm.controls['age'].setValue(this.editData.age);
    this.empForm.controls['description'].setValue(this.editData.description);
  }
}

addEmployee(){
if(!this.editData){
  if(this.empForm.valid){
    this.api.postEmp(this.empForm.value).subscribe({
      next:(res)=>{
        alert("Employee added Succsessfully");
        this.empForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error")
      }
    })
   
  }}
  else{
    this.updateEmp()
  }
}
  updateEmp(){
    this.api.putEmp(this.empForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Employee Updated Succsessfully");
        this.empForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error")
      }
    })
}
}
