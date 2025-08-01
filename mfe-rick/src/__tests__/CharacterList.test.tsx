import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../app-host/src/i18n/test-config';
import CharacterList from '../components/CharacterList';

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          origin: { name: 'Earth (C-137)' },
          location: { name: 'Citadel of Ricks' },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      ],
    }),
  }) as unknown as typeof fetch;
});

describe('CharacterList (Rick and Morty)', () => {
  it('debería mostrar que Rick está vivo', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    expect(await screen.findByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(await screen.findByText(/Alive/i)).toBeInTheDocument();
  });

  it('debería mostrar su planeta de origen y ubicación actual', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    expect(await screen.findByText(/Earth \(C-137\)/i)).toBeInTheDocument();
    expect(await screen.findByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });

  it('debería renderizar la imagen de Rick correctamente', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    const img = await screen.findByAltText(/Rick Sanchez/i);
    expect(img).toHaveAttribute('src', expect.stringContaining('avatar/1.jpeg'));
  });
});
