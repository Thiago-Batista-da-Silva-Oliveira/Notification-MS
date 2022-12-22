import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notification-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented');
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented');
  }
}
