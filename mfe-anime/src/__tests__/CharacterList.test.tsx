import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterList from '../components/CharacterList';

describe('CharacterList (Anime)', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                mal_id: 1,
                name: 'Ichigo Kurosaki',
                images: {
                  jpg: {
                    image_url: 'https://cdn.example.com/ichigo.jpg',
                  },
                },
                about: 'Race: Human\nBirthday: July 15 (Cancer)\nAge: 15...',
                favorites: 35619,
              },
            ],
          }),
      })
    ) as unknown as typeof fetch;
  });

  it('renderiza un personaje de anime', async () => {
    render(<CharacterList />);
    expect(await screen.findByText(/Ichigo Kurosaki/i)).toBeInTheDocument();
    expect(await screen.findByAltText(/Ichigo Kurosaki/i)).toBeInTheDocument();
    expect(await screen.findByText(/⭐ 35619 favorites/i)).toBeInTheDocument();
  });

  it('muestra la sinopsis del personaje', async () => {
    render(<CharacterList />);
    expect(await screen.findByText(/Race: Human/i)).toBeInTheDocument();
  });

  it('renderiza la imagen del personaje con el src correcto', async () => {
    render(<CharacterList />);
    const img = await screen.findByAltText(/Ichigo Kurosaki/i);
    expect(img).toHaveAttribute('src', 'https://cdn.example.com/ichigo.jpg');
  });
});
