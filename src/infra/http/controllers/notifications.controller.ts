import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { SendNotification } from '@application/use-cases/send-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post('send')
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId, senderId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
      senderId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @MessagePattern('notification')
  async getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    const { message } = JSON.parse(context.getMessage().content);

    await this.create({
      category: message.category,
      content: message.content,
      recipientId: message.recipientId,
      senderId: message.senderId,
    });
  }
}
