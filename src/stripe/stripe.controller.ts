import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './dto/session.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('stripe')
export class StripeController {
  constructor(private readonly StripeService: StripeService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('create-checkout-session')
  @ApiOperation({ summary: 'SummaryConstants.ADD_ORDER' })
  async createCheckoutSession(
    @Request() req,
    @Body() CreateCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    try {
      const session = await this.StripeService.createCheckoutSession(
        req.user._id,
        CreateCheckoutSessionDto,
      );
      return { url: session.url };
    } catch (error) {
      return { error: error.message };
    }
  }
}
