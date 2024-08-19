import { render, screen , fireEvent} from '@testing-library/react';
import ContactUs from '../components/pages/ContactUs';
import { BrowserRouter } from 'react-router-dom';

// Mock the useUser hook
jest.mock('../components/pages/UserContext', () => ({
    useUser: () => ({
        user: { id: 'testUser', name: 'Test User', email: 'test@example.com' }
    })
}));

test('renders ContactUs component without crashing', () => {
    render(
        <BrowserRouter>
            <ContactUs />
        </BrowserRouter>
    );

 fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
 fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
 fireEvent.change(screen.getByLabelText(/Feedback/i), { target: { value: 'Great service!' } });

 expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});
