import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProvidersServices from '@modules/appointments/services/ListProvidersServices';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createAppointment = container.resolve(ListProvidersServices);

    const providers = await createAppointment.execute({
      user_id,
    });

    return response.json(providers);
  }
}
