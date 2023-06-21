import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/tests-utils';
import ProfileSelector from './ProfileSelector';

test('renders profile selector', () => {
  const { container } = renderWithProviders(<ProfileSelector />);
  expect(container).toMatchSnapshot();
});

test('handle add profile', async () => {
    const { container } = renderWithProviders(<ProfileSelector />);

    const addButton = screen.getByText('Add');
    addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const newOption = await screen.findByText('Profile 2');
    expect(newOption).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});

test('handle rename profile', async () => {
    const { container } = renderWithProviders(<ProfileSelector />);

    const renameButton = screen.getByText('Rename');
    renameButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Profile 1' } });

    const confirmButton = screen.getByText('Save');
    confirmButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const newOption = await screen.findByText('New Profile 1');
    expect(newOption).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});

test('handle duplicate profile', async () => {
    const { container } = renderWithProviders(<ProfileSelector />);

    const duplicateButton = screen.getByText('Duplicate');
    duplicateButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const newOption = await screen.findByText('Profile 1 Duplicate 1');
    expect(newOption).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});

test('handle delete profile', async () => {
    const { container } = renderWithProviders(<ProfileSelector />, {
        preloadedState: {
            profile: {
                profiles: [{ id: 1, name: 'Profile 1' }, { id: 2, name: 'Profile 2' }],
                selectedProfileID: 1,
                rename: false,
                renameText: '',
            }
        },
    });

    const deleteButton = screen.getByText('Delete');
    deleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await waitForElementToBeRemoved(screen.queryByText('Profile 1'));
    expect(screen.queryByText('Profile 1')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
});