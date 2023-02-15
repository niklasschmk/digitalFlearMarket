import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put, Session
} from '@nestjs/common';
import {UserService} from "../../providers/user.service/user.service";
import {User} from "../../models/user";
import {ApiResponse} from "@nestjs/swagger";
import {CreateUserRequestDto} from "../../dtos/users/CreateUserRequestDto";
import {CreateUserResponseDto} from "../../dtos/users/CreateUserResponseDto";
import {UpdateUserRequestDto} from "../../dtos/users/UpdateUserRequestDto";
import {UpdateUserResponseDto} from "../../dtos/users/UpdateUserResponseDto";
import {MessageResultDto} from "../../dtos/MessageResultDto";
import {LoginReqDto} from "../../dtos/auth/LoginReqDto";
import {LoginResDto} from "../../dtos/auth/LoginResDto";
import {ISession} from "../../ISession";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {
    }

    @Get('/users')
    async getAllUsers(): Promise<User[]> {
        let users: User[] = []
        try {
            users = await this.userService.getAllUsers();
            return users;
        } catch (err) {
            throw new BadRequestException('Something bad happened', { cause: err, description: 'Some error description' })
        }
    }

    @Get(':userId')
    getUserById(@Param('userId', ParseIntPipe) userId: number): Promise<User>{
        try {
            return this.userService.getUserById(userId);
        } catch (err) {
            throw new NotFoundException('There is no user with this id', {cause: err, description: 'An user with this id was not found.'})
        }
    }

    @Post('/newUser')
    @ApiResponse({type: CreateUserRequestDto})
    createNewUser(@Body() body: CreateUserRequestDto): CreateUserResponseDto {
        try {
            this.userService.createNewUser(body);
            return new CreateUserResponseDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Post('/adminLogin')
    adminLogin(@Session() session: ISession, @Body() body: LoginReqDto): LoginResDto {
        try {
            this.userService.adminLogin(session, body);
            return new LoginResDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Put('/updateUser/:userId')
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() body: UpdateUserRequestDto): UpdateUserResponseDto{
        try {
            this.userService.updateUser(userId, body);
            return new UpdateUserResponseDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Delete('/delete/:userId')
    deleteUserById(@Param('userId', ParseIntPipe) userId: number): void {
        try {
            this.userService.remove(userId);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }
}
