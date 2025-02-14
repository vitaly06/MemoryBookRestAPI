import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/PrismaService';
import { LoginUser, RegisterUser } from './user.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}

    async checkRegister(email: string, phoneNumber: string){
        const findUser = await this.prisma.user.findFirst({
            where: {
                OR : [
                    {email},
                    {phoneNumber}
                ]
            }
        })
        return findUser ? false : true
    }

    async register(data: RegisterUser){
        const {fullName, phoneNumber, email, password} = data

        const hashPassword = await hash(password, 10)
        await this.prisma.user.create({
            data: {
                fullName, phoneNumber, email, password: hashPassword
            }
        })
    }

    async login(data: LoginUser ) {
        const { phoneNumber, email, password } = data;
        const user = await this.prisma.user.findUnique({
            where: { phoneNumber, email },
        });
        if (!user) {
            throw new UnauthorizedException("Неверный логин или пароль");
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Неверный логин или пароль");
        }
        const payload = { email: user.email, sub: user.userId }; 
        return this.jwtService.sign(payload);

    }

}
