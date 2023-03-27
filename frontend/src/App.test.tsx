import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders lol stats header', () => {
  render(<App />);
  const linkElement = screen.getByText(/LoL Stats/i);
  expect(linkElement).toBeInTheDocument();
});
