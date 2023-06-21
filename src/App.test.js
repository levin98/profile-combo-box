import { renderWithProviders } from './utils/tests-utils';
import App from './App';

test('renders app with profile selector', () => {
  const { container } = renderWithProviders(<App />);
  expect(container).toMatchSnapshot();
});
