import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUser{
    @ApiProperty({description: "fullName"})
    @IsString()
    @IsNotEmpty()
    fullName: string;
    @ApiProperty({description: "phoneNumber"})
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
    @ApiProperty({description: "email"})
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({description: "password"})
    @IsNotEmpty()
    @IsString()
    password: string;
    @ApiProperty({description: "repassword"})
    @IsNotEmpty()
    @IsString()
    repassword: string;

}

export class LoginUser{
    @ApiProperty({description: "phoneNumber"})
    @IsString()
    phoneNumber: string;
    @ApiProperty({description: "email"})
    @IsString()
    email: string;
    @ApiProperty({description: "password"})
    @IsString()
    password: string;
}