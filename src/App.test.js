import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the SRC Ecosystem assessment', () => {
  render(<App />);
  expect(screen.getByText(/SRC Ecosystem/i)).toBeInTheDocument();
});
