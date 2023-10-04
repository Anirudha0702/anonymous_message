import { render, screen } from '@testing-library/react';
import App from './App';
import { it,expect } from 'vitest';

it("Test 1 r" , ()=>{
  render(<App/>)
  const m = screen.queryByText(/Hello world/i)
  expect(m).toBeDefined()
})