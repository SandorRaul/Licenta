import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpAdmin from '../signup_sign/Sign_UpAdmin'; // Actualizează cu calea corectă
import { LoginContext } from '../context/ContextProvider'; // Actualizează cu calea corectă

// Mock pentru Fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

// Mock pentru react-toastify
jest.mock('react-toastify', () => {
  const originalModule = jest.requireActual('react-toastify');
  return {
    ...originalModule,
    ToastContainer: () => <div>ToastContainer</div>,
  };
});

describe('Sign_UpAdmin', () => {
  // Setează valori inițiale pentru context dacă este necesar
  const contextValue = { account: null, setAccount: jest.fn() };

  beforeEach(() => {
    // Curăță mock-urile înainte de fiecare test
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <LoginContext.Provider value={contextValue}>
        <SignUpAdmin />
      </LoginContext.Provider>
    );

    expect(screen.getByText(/Add admin/i)).toBeInTheDocument();
  });

  it('calls API and shows toast on successful admin creation', async () => {
    render(
      <LoginContext.Provider value={contextValue}>
        <SignUpAdmin />
      </LoginContext.Provider>
    );

    // Completează formularul 
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Admin' } });
    fireEvent.change(screen.getByLabelText(/CNP/i), { target: { value: '1234567890123' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@test.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByText(/Create Admin/i));

    await waitFor(() => {
      // Verifică dacă fetch a fost apelat
      expect(global.fetch).toHaveBeenCalledWith(expect.anything(), expect.anything());

      // Verifică mesajul de succes (mock pentru toast)
      expect(screen.getByText(/ToastContainer/i)).toBeInTheDocument();
    });
  });

  // Adaugă alte teste după necesități
});


describe('SIgnUpAdmin Component', () => {
    it('renders the component correctly', () => {
      render(<SIgnUpAdmin />);
      
      // Verificăm dacă componenta se afișează corect
      expect(screen.getByText('Add admin')).toBeInTheDocument();
    });
  
    it('handles input changes correctly', () => {
      render(<SIgnUpAdmin />);
      
      // Simulăm schimbarea valorii într-un input
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
      
      // Verificăm dacă valoarea input-ului s-a actualizat
      expect(screen.getByLabelText('Name')).toHaveValue('John');
    });
  
    it('handles form submission correctly', async () => {
      render(<SIgnUpAdmin />);
      
      // Simulăm completarea formularului și trimiterea lui
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('CNP'), { target: { value: '1234567890123' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Mobile'), { target: { value: '1234567890' } });
      fireEvent.click(screen.getByText('Create Admin'));
      
      // Așteptăm ca fetch să fie apelat cu datele corecte
      expect(fetch).toHaveBeenCalledWith('/register_admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: 'John',
          cnp: '1234567890123',
          email: 'test@gmail.com',
          mobile: '1234567890',
          password: expect.any(String), // Acesta va fi generat aleatoriu
          cpassword: expect.any(String), 
          key: '',
          usertype: 'admin',
        }),
      });
      
      // Așteptăm să se afișeze mesajul de succes
      expect(await screen.findByText('Admin successfully added')).toBeInTheDocument();
    });
  });