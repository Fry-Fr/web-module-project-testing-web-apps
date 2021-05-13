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
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});