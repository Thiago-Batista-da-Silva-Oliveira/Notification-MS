import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
  senderId?: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category, senderId } = request;

    console.log(`aqui ${senderId}`);

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
      senderId,
    });

    console.log(`uepa ${notification.senderId}`);

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
