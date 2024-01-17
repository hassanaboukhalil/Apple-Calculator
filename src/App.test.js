import { render, screen } from '@testing-library/react';
import ResultScreen from './components/ResultScreen';
import { ValuesProvider } from './context/valuesContext';

test('renders the output on the screen', () => {
  // Render the component
  render(
    <ValuesProvider>
      <ResultScreen />
    </ValuesProvider>
  );

  // Get the element by ID
  const res = screen.getByTestId('result');

  // Check the innerHTML
  expect(res).not.toHaveTextContent('');

});

test('the output number should not contain more than one point/dot', () => {
  // Render the component
  render(
    <ValuesProvider>
      <ResultScreen />
    </ValuesProvider>
  );

  // Get the element by ID
  let nb = screen.getByTestId('result').textContent;

  // Check the innerHTML
  expect(Number(nb)).not.toEqual(NaN);

});
