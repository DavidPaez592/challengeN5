import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../app-host/src/i18n/test-config';
import CharacterList from '../components/CharacterList';

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      items: [
        {
          id: 1,
          name: 'Goku',
          image: 'https://i.pinimg.com/564x/9f/7d/12/9f7d128fd9270f00e787b6596fdbf556.jpg',
          ki: '9000',
          maxKi: '15000',
          race: 'Saiyajin',
          gender: 'male',
          affiliation: 'Guerreros Z',
        },
      ],
    }),
  }) as unknown as typeof fetch;
});

describe('CharacterList (DBZ)', () => {
  it('debería mostrar a Goku como un saiyajin', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    const gokuName = await screen.findByText(/Goku/i);
    const gokuRace = await screen.findByText(/Saiyajin/i);

    expect(gokuName).toBeInTheDocument();
    expect(gokuRace).toBeInTheDocument();
  });

  it('debería mostrar su nivel de ki y afiliación', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    expect(await screen.findByText(/9000/i)).toBeInTheDocument();
    expect(await screen.findByText(/Guerreros Z/i)).toBeInTheDocument();
  });

  it('debería renderizar su imagen correctamente', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList />
      </I18nextProvider>
    );

    const img = await screen.findByAltText(/Goku/i);
    expect(img).toHaveAttribute(
      'src',
      'https://i.pinimg.com/564x/9f/7d/12/9f7d128fd9270f00e787b6596fdbf556.jpg'
    );
  });
});
