import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'app-confrim-dialog',
    templateUrl: './confrim-dialog.component.html',
    styleUrls: ['./confrim-dialog.component.less'],
})
export class ConfrimDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfrimDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onCancel(): void {
        this.dialogRef.close(false);
    }
    onConfirm(): void {
        this.dialogRef.close(true);
    }
}
