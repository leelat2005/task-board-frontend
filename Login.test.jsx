
import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../pages/Login'
import { BrowserRouter } from 'react-router-dom'

test('shows error on invalid login', () => {
  render(<BrowserRouter><Login/></BrowserRouter>)
  
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'wrong@test.com' }
  })
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'wrongpass' }
  })
  fireEvent.click(screen.getByText(/login/i))

  expect(screen.getByText(/invalid credentials/i)).toBeTruthy()
})
