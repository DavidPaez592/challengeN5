import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import '../i18n'; // init real
import i18n from 'i18next';

describe('App', () => {
  it('muestra la descripción del proyecto en español', async () => {
    await act(async () => {
      await i18n.changeLanguage('es');
    });

    render(<App />);

    expect(
      await screen.findByText(/este proyecto te permite explorar/i)
    ).toBeInTheDocument();
  });

  it('muestra la descripción del proyecto en inglés', async () => {
    await act(async () => {
      await i18n.changeLanguage('en');
    });

    render(<App />);
    expect(
      await screen.findByText(/this project allows you to explore/i)
    ).toBeInTheDocument();
  });

  it('cambia a la vista del microfrontend de DBZ al hacer clic', async () => {
    await act(async () => {
      await i18n.changeLanguage('en');
    });

    render(<App />);

    const dbzButton = await screen.findByRole('button', {
      name: /dragon ball z/i,
    });

    expect(dbzButton).toBeInTheDocument();

    await userEvent.click(dbzButton); // <- esto soluciona el warning

    expect(await screen.findByText(/loading/i)).toBeInTheDocument(); // fallback visible
  });
});
