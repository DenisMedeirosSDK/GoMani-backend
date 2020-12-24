import { container } from 'tsyringe';

import IHshProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHshProvider>('HashProvider', BCryptHashProvider);
