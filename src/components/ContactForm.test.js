import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const h1 = screen.getByRole('heading');
    expect(h1.textContent).toBe('Contact Form');
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByLabelText('First Name*');
    userEvent.type(fNameInput, 'Ant');
    await waitFor(()=> expect(screen.getByTestId('error')));
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    await waitFor(()=> expect(screen.findAllByTestId('error')));
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByLabelText('First Name*');
    const lNameInput = screen.getByLabelText('Last Name*');
    const submitButton = screen.getByRole('button');
    userEvent.type(fNameInput, 'Antone');
    userEvent.type(lNameInput, 'Owntan');
    userEvent.click(submitButton);
    await waitFor(()=> expect(screen.findByTestId('error')));
    expect(screen.getByTestId('error')).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'email');
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Error: email must be a valid email address.')
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByLabelText(/first name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button');
    userEvent.type(fNameInput, 'RyanWithFiveLetters');
    userEvent.type(emailInput, 'em@em.com');
    userEvent.click(submitButton);
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Error: lastName is a required field.');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole(/button/i);
    
    userEvent.type(fNameInput, 'Waldo');
    userEvent.type(lNameInput, 'Walker');
    userEvent.type(emailInput, 'em@em.com');

    expect(screen.queryByTestId('firstnameDisplay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('lastnameDisplay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('emailDisplay')).not.toBeInTheDocument();

    userEvent.click(submitButton);

    expect(screen.queryByTestId('firstnameDisplay')).toBeInTheDocument();
    expect(screen.queryByTestId('lastnameDisplay')).toBeInTheDocument();
    expect(screen.queryByTestId('emailDisplay')).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole(/button/i);

    userEvent.type(fNameInput, 'theBatman');
    userEvent.type(lNameInput, 'Wayne');
    userEvent.type(emailInput, 'brucew@hotmail.com');
    userEvent.type(messageInput, "Where's Rachel");

    userEvent.click(submitButton);

    expect(screen.getByText('theBatman')).toBeInTheDocument();
    expect(screen.getByText('Wayne')).toBeInTheDocument();
    expect(screen.getByText('brucew@hotmail.com')).toBeInTheDocument();
    expect(screen.queryAllByText("Where's Rachel")).toBeTruthy();
});