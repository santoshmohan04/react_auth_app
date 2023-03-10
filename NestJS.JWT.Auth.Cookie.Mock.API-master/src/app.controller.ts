import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const jwtToken = await this.authService.getToken(req.user);
    const secretData = {
      accessToken: jwtToken,
      refreshToken: 'wCH7PEZy1AbvsASAPyM9qo7Bus3qqy',
    };
    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 86409000),
    });
    return { msg: 'success' };
  }

  @Post('/signup')
  async addUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') pswd: string,
    @Body('confirmPassword') confirm_pswd: string,
  ) {
    const response = await this.authService.createUser(
      firstName,
      lastName,
      phone,
      email,
      pswd,
      confirm_pswd,
    );

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-profile')
  userProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('liked-movies')
  likedMovies() {
    // res.cookie('temp', "hello",{
    //   httpOnly: true,
    //   expires: new Date(new Date().getTime()+86409000),
    // });
    return [
      'Avengers EndGame',
      'The Lion King',
      'Harry Potter',
      'Sherlock Holmes',
    ];
  }

  @UseGuards(AuthGuard('refresh-token'))
  @Get('refresh-token')
  async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    const jwtToken = await this.authService.getToken(req.user);
    const secretData = {
      accessToken: jwtToken,
      refreshToken: 'wCH7PEZy1AbvsASAPyM9qo7Bus3qqy',
    };

    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 86409000),
    });

    // req.
    // req.coo
    return { msg: 'success' };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-cookie');
    return { msg: 'success' };
  }
}
