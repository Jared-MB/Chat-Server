import { BadRequestException, Body, Controller, Post, UseInterceptors, } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('user')
export class UserController {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    @UseInterceptors(ResponseInterceptor)
    @Post()
    async createUser(@Body() body: any) {
        const isUserCreated = await this.userRepository.existsByExternalId(body.externalId)
        if (isUserCreated) {
            throw new BadRequestException('User already exists')
        }

        const user = await this.userRepository.create(body.user)
        return user
    }

}
