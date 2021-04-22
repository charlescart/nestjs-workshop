import { IsInt, IsNotEmpty, IsPositive, IsString, Max, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    last_name: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    @Max(100)
    age: number;
}
