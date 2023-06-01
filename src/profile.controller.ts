// profile controller
import {
  Controller,
  Get,
  Body,
  Put,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import AbstractController from './abstract.controller';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RequestWithUser } from './auth/jwt.strategy';
import { UpdateUserDTO } from './users/dto/update-user-dto';
import { UsersService } from './users/users.service';

@Controller('profile')
export class ProfileController extends AbstractController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: RequestWithUser) {
    const user = await this.usersService.findOneHidePassword(req.user.email);
    return this.successResponse(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() body: UpdateUserDTO,
  ) {
    await this.usersService.update(req.user.email, body);
    const user = await this.usersService.findOneHidePassword(req.user.email);

    return this.successResponse(user, 'Profile updated successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  async updatePassword(
    @Req() req: RequestWithUser,
    @Body() body: { currentPassword: string; password: string },
  ) {
    const validUser = await this.authService.validateUser(
      req.user.email,
      body.currentPassword,
    );
    if (validUser) {
      const encrypted = await this.usersService.encryptPassword(body.password);
      await this.usersService.update(req.user.email, {
        password: encrypted,
      });
    }
    const user = await this.usersService.findOneHidePassword(req.user.email);

    return this.successResponse(user, 'Password changed successfully');
  }
}
