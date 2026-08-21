import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CurrentUserDTO {
    @Type(() => Number)
    userId: number;
    @IsString()
    username: string;
    @IsString()
    role: string;
    @IsString()
    user_type: string;
}