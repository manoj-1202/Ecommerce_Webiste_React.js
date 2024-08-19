import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Banner from '../components/banner';
import { create } from 'react-test-renderer';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Test to render the Banner component without crashing
test('renders Banner component without crashing', () => {
    render(
        <BrowserRouter>
            <Banner />
        </BrowserRouter>
    );
});

// Snapshot test for Banner component
test('matches snapshot', () => {
    const component = create(
        <BrowserRouter>
            <Banner />
        </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// Test to check if button click triggers navigation
test('navigates to products page on button click', () => {
    const navigate = jest.fn(); 
    useNavigate.mockReturnValue(navigate); 

    render(
        <BrowserRouter>
            <Banner />
        </BrowserRouter>
    );

    const button = screen.getByText(/Shop Now/i);
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith('/products');
});
