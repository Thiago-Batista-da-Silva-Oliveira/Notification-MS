import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationsRequest {
  recipientId: string;
  senderId: string;
}

type ReadNotificationResponse = {
  notifications: Notification[];
};

@Injectable()
export class ReadNotificationsFromTheSameUser {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationsRequest,
  ): Promise<ReadNotificationResponse> {
    const { recipientId, senderId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientAndSenderId(
        recipientId,
        senderId,
      );

    if (!notifications) {
      throw new NotificationNotFound();
    }

    for (let i = 0; i < notifications.length; i++) {
      const handleNotifications = async () => {
        const notification = notifications[i];
        notification.read();
        await this.notificationsRepository.save(notification);
      };

      await handleNotifications();
    }

    return {
      notifications,
    };
  }
}
