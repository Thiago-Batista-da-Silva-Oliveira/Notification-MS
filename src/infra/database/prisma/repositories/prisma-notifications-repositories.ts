import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notification-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  async findById(notificationId: string) {
    return this.prismaService.notification.findFirst({
      where: {
        id: notificationId,
      },
    });
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented');
  }
}
