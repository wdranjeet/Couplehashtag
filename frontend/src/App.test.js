import { render, screen } from '@testing-library/react';
import App from './App';

test('renders couple hashtag maker heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Couple Name Hashtag Maker/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders trending hashtags section', () => {
  render(<App />);
  const trendingElement = screen.getByText(/Trending Hashtags/i);
  expect(trendingElement).toBeInTheDocument();
});

test('renders footer links', () => {
  render(<App />);
  const aboutLink = screen.getByText(/About Us/i);
  expect(aboutLink).toBeInTheDocument();
});
