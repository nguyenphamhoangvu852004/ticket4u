/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
@Controller('oauth')
export class OAuthHttp {
  constructor() {}
  @Post('/google')
  async google(@Req() req: Request, @Res() res: Response) {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'idToken is required',
      });
    }

    try {
      const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_WEB_CLIENT_ID, // Phải khớp với Client ID
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error('Invalid token payload');
      }

      if (!payload.email_verified) {
        return res.status(401).json({
          success: false,
          message: 'Email not verified by Google',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Google login successful',
        user: {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name,
          avatar: payload.picture,
          givenName: payload.given_name,
          familyName: payload.family_name,
        },
      });
    } catch (error: any) {
      console.error('Google login error details:', error.message);

      return res.status(401).json({
        success: false,
        message: error.message || 'Invalid Google token',
      });
    }
  }
  @Get('google/callback')
  async googleCallback(@Req() req: Request, @Res() res: Response) {}
}
