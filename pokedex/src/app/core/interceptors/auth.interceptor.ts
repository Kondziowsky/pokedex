import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = '9c47cae3-4b1d-4041-949b-d2411f8bc124';
  const authReq = req.clone({
    setHeaders: {
      'X-Api-Key': apiKey
    }
  });
  return next(authReq);
};
