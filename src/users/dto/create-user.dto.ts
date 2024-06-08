import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsBoolean()
    isAdmin: boolean;
}
