import React from 'react'; // Importa React
import '@testing-library/jest-dom'; // Para las aserciones adicionales
import { render, screen } from '@testing-library/react';
import Login from './Login'; // Asegúrate de que esta ruta sea correcta

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    
    // Verificamos que los campos de entrada y el botón estén presentes
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
