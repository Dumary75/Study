import { render, screen } from '@testing-library/react';
import App from './App';

test('test und so', () => {
  render(<App />);
  const linkElement = screen.getByText(/TEST/i);
  expect(linkElement).toBeInTheDocument();
});
