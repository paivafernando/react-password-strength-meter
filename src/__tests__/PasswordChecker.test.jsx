// @vitest-environment jsdom
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import App from '../App';

describe('Password Strength Meter - Automated Verification', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('1. Renders password input with exact placeholder', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Enter password');
    expect(inputElement).toBeInTheDocument();
  });

  it('2. Keeps strength label empty and bar transparent on initial load', () => {
    render(<App />);
    const statusText = screen.getByTestId('strength-label');
    const indicator = screen.getByTestId('strength-bar');
    expect(statusText.textContent).toBe('');
    expect(indicator).toHaveStyle('background-color: rgba(0, 0, 0, 0)');
  });

  it('3. Marks passwords under 8 characters as Weak regardless of complexity', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Enter password');
    fireEvent.change(inputElement, { target: { value: 'Ab1!' } });

    const statusText = screen.getByTestId('strength-label');
    const indicator = screen.getByTestId('strength-bar');
    expect(statusText.textContent).toBe('Weak');
    expect(indicator).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('4. Marks 8+ character passwords satisfying 2 or 3 criteria as Medium', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Enter password');
    fireEvent.change(inputElement, { target: { value: 'abcdefg1' } });

    const statusText = screen.getByTestId('strength-label');
    const indicator = screen.getByTestId('strength-bar');
    expect(statusText.textContent).toBe('Medium');
    expect(indicator).toHaveStyle('background-color: rgb(255, 165, 0)');
  });

  it('5. Marks 8+ character passwords satisfying ALL 4 criteria as Strong', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Enter password');
    fireEvent.change(inputElement, { target: { value: 'Abcdef1!' } });

    const statusText = screen.getByTestId('strength-label');
    const indicator = screen.getByTestId('strength-bar');
    expect(statusText.textContent).toBe('Strong');
    expect(indicator).toHaveStyle('background-color: rgb(0, 128, 0)');
  });

  it('6. Resets indicator bar and text when password input is cleared', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Enter password');
    fireEvent.change(inputElement, { target: { value: 'Abcdef1!' } });
    fireEvent.change(inputElement, { target: { value: '' } });

    const statusText = screen.getByTestId('strength-label');
    const indicator = screen.getByTestId('strength-bar');
    expect(statusText.textContent).toBe('');
    expect(indicator).toHaveStyle('background-color: rgba(0, 0, 0, 0)');
  });
});