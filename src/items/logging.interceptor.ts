import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    const nowDate = new Date()
    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now;
        console.log(`[${request.method}] ${nowDate.getFullYear()}/${nowDate.getMonth()}/${nowDate.getDate()} ${request.url} - ${response.statusCode} - ${delay}ms`);
      }),
    );
  }
}