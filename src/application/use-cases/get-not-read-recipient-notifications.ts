import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface GetNotReadRecipientNotificationsRequest {
  recipientId: string;
}

interface GetNotReadRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetNotReadRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetNotReadRecipientNotificationsRequest,
  ): Promise<GetNotReadRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyNotReadByRecipientId(
        recipientId,
      );

    return {
      notifications,
    };
  }
}
