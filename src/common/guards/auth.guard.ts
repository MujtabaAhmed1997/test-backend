import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";



@Injectable()
export class AuthGuard {
    constructor(
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization?.replace('Bearer ', '');
        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader;
        console.log("AuthGuard Token: ", token);

        

        return true;

    }
}