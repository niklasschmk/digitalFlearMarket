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
    Put
} from '@nestjs/common';
import {UserService} from "../../providers/user.service/user.service";
import {User} from "../../models/user";
import {ApiResponse} from "@nestjs/swagger";
import {CreateUserRequestDto} from "../../dtos/users/CreateUserRequestDto";
import {CreateUserResponseDto} from "../../dtos/users/CreateUserResponseDto";
import {UpdateUserRequestDto} from "../../dtos/users/UpdateUserRequestDto";
import {UpdateUserResponseDto} from "../../dtos/users/UpdateUserResponseDto";

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
        this.userService.createNewUser(body);
        return new CreateUserResponseDto(true);
    }

    @Put('/updateUser/:userId')
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() body: UpdateUserRequestDto): UpdateUserResponseDto{
        this.userService.updateUser(userId, body);
        return new UpdateUserResponseDto(true);
    }

    @Delete('/delete/:userId')
    deleteUserById(@Param('userId', ParseIntPipe) userId: string): void {
        this.userService.remove(userId);
    }
}
