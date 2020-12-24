import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      user_id: 'user-id',
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 11, 2, 13);

    await createAppointment.execute({
      user_id: 'user-id',
      date: appointmentDate,
      provider_id: '123456',
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2020, 4, 10, 11),
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '123456',
        date: new Date(2020, 4, 10, 11),
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment before *am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2020, 4, 11, 7),
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2020, 4, 11, 18),
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
