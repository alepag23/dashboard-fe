import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from '../../shared/models/notification-model';

@Service()
export class NotificationService {
    private readonly snackBar = inject(MatSnackBar);

    success(message: string): void {
        this.show('success', message, 6000);
    }

    error(message: string): void {
        this.show('error', message, 8000);
    }

    private show(type: NotificationType, message: string, duration: number): void {
        this.snackBar.open(message, 'Close', {
            panelClass: [`snack-${type}`],
            duration: duration,
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    }
}
