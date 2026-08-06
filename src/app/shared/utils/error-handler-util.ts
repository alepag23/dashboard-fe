import { HttpErrorResponse } from "@angular/common/http";

/**
 * Extracts a formatted error message from any exception.
 */
export function extractErrorMessage(error: unknown, fallbackMessage = 'An unexpected error has occurred.'): string {
    // Error to Angular HttpClient
    if (error instanceof HttpErrorResponse) {
        return error.error?.message || fallbackMessage;
    }
    // Standard error JS (es. TypeError, SyntaxError)
    if (error instanceof Error) {
        return error.message;
    }
    // raw string
    if (typeof error === 'string') {
        console.log('typeof error', error);

        return error;
    }

    return fallbackMessage;
}