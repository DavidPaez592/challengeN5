import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../app-host/src/i18n/test-config';
import CharacterList from '../components/CharacterList';

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ([
      {
        name: 'Harry Potter',
        species: 'human',
        gender: 'male',
        eyeColour: 'green',
        hairColour: 'black',
        image: 'https://ik.imagekit.io/hpapi/harry.jpg',
      },
    ]),
  }) as unknown as typeof fetch;
});

describe('CharacterList (Harry Potter)', () => {
  it('debería mostrar que Harry Potter es humano', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    expect(await screen.findByText(/Harry Potter/i)).toBeInTheDocument();
    expect(await screen.findByText(/human/i)).toBeInTheDocument();
  });

  it('debería mostrar su color de ojos y cabello', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    expect(await screen.findByText(/green/i)).toBeInTheDocument();
    expect(await screen.findByText(/black/i)).toBeInTheDocument();
  });

  it('debería renderizar la imagen de Harry con el src correcto', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    const img = await screen.findByAltText(/Harry Potter/i);
    expect(img).toHaveAttribute('src', expect.stringContaining('harry.jpg'));
  });
});
