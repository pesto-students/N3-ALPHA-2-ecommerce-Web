import { render, screen } from '@testing-library/react';
import { checkValidEmail } from '../helper/Utils';

test('Email validation', () => {
    const validEmail = checkValidEmail('rohit');
    expect(validEmail).toBeFalsy();
});
