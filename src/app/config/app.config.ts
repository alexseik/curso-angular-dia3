import { InjectionToken } from '@angular/core';
import { Candidate } from '../models/candidate';
import { Experience } from '../models/experience';

export interface AppConfig {
  candidates?: Candidate[];
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const Config: AppConfig = {
  candidates: [
    {
      id: 0,
      email: 'candidate@email.com',
      phone: '+34634434312',
      experience: Experience.Junior,
      name: 'Carlos',
      previousProjects: [
        {
          name: 'BBVA',
          technology: ['ReactJS'],
          description: 'Programador Junior',
          experience: 1,
        },
      ],
      surname: 'Ruiz Marco',
    },
    {
      id: 1,
      email: 'candidate1@email.com',
      phone: '+34634434312',
      experience: Experience.Midlevel,
      name: 'Juan',
      previousProjects: [
        {
          name: 'BBVA',
          technology: ['ReactJS', 'JQuery'],
          description:
            'Programador encargado de correcciones en la página web de venta privada',
          experience: 1,
        },
        {
          name: 'Indra',
          technology: ['Angular', 'Express'],
          description: 'Desarrollador fullstack JS',
          experience: 3,
        },
      ],
      surname: 'Martínez',
    },
    {
      id: 2,
      email: 'candidate1@email.com',
      phone: '+34634434312',
      experience: Experience.Senior,
      name: 'Paco',
      previousProjects: [
        {
          name: 'BBVA',
          technology: ['ReactJS', 'JQuery'],
          description:
            'Programador encargado de correcciones en la página web de venta privada',
          experience: 1,
        },
        {
          name: 'Indra',
          technology: ['Angular', 'Express'],
          description: 'Desarrollador fullstack JS',
          experience: 3,
        },
        {
          name: 'Compañía del Cantabrico',
          technology: ['Java', 'AngularJS'],
          description: 'Desarrollador fullstack java y JS',
          experience: 3,
        },
      ],
      surname: 'García Olano',
    },
  ],
};
