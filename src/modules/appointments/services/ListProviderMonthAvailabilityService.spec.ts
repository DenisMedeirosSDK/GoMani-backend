import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let ListProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    ListProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availablity = await ListProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availablity).toEqual(
      expect.arrayContaining([
        { day: 19, availability: true },
        { day: 20, availability: false },
        { day: 21, availability: true },
        { day: 22, availability: true },
      ]),
    );
  });
});
