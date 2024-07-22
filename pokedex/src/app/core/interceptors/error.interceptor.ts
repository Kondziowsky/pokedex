import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

const router = inject(Router);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 403) {
          router.navigate(['/page-error']);
        } else {
          /* TODO -> another component or make just one (reusability with inputs) */
        }
        return throwError(() => error);
      })
  );
};
