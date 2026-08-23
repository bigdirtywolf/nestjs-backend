import {
    createParamDecorator,
    ExecutionContext,
    CanActivate,
    Injectable,
} from '@nestjs/common';
import { ResultData } from 'src/const/Result';
import { CurrentUserDTO } from 'src/dto/CurrentUserDTO';

export const CurrentUser = createParamDecorator<CurrentUserDTO>(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userInfo = request.headers['x-user-info'];
        if (!userInfo) return null;
        const returnData: CurrentUserDTO = {
            userId: JSON.parse(userInfo).userId || '',
            username: JSON.parse(userInfo).username || '',
            role: JSON.parse(userInfo).role || '',
            user_type: JSON.parse(userInfo).user_type || '',
        };
        return returnData;
    },
);
@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const userInfo = request.headers['x-user-info'];
        const role =JSON.parse(userInfo).role;

        if (!role) {
            response.status(200).json(ResultData.fail(401, '未登录'));
            return false
        }

        return true;
    }
}