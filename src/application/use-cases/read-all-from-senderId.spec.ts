import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';

import { ReadNotificationsFromTheSameUser } from './read-all-from-senderId';

describe('Read all notifications from the same user', () => {
  it('should be able to read the notifications from the same user', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotifications = new ReadNotificationsFromTheSameUser(
      notificationsRepository,
    );

    const notification = makeNotification({ senderId: '2' });

    await notificationsRepository.create(notification);

    const notification2 = makeNotification({ senderId: '2' });

    await notificationsRepository.create(notification2);

    const notification3 = makeNotification({ senderId: '1' });

    await notificationsRepository.create(notification3);

    const { notifications } = await readNotifications.execute({
      recipientId: notification.recipientId,
      senderId: '2',
    });

    expect(notifications).toHaveLength(2);
  });
});
