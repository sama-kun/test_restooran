import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
export declare class JwtAuthGuard implements CanActivate {
    private jwtService;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    constructor(jwtService: JwtService);
}
