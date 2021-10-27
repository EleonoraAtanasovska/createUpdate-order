import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";


@Component({
  templateUrl:'./error.component.html'
})

export class ErrorComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}, public matDialogRef: MatDialogRef<ErrorComponent>, public router : Router){}


  closeDialog(){
    this.matDialogRef.close()
     this.router.navigate(['/izmena'])
  }

}
