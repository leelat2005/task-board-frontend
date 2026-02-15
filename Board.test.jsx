
import { render, screen, fireEvent } from '@testing-library/react'
import Board from '../pages/Board'

beforeEach(() => {
  localStorage.clear()
})

test('adds a new task', () => {
  render(<Board/>)
  
  fireEvent.change(screen.getByPlaceholderText(/task title/i), {
    target: { value: 'Test Task' }
  })
  fireEvent.click(screen.getByText(/add/i))

  expect(screen.getByText('Test Task')).toBeTruthy()
})

test('deletes a task', () => {
  render(<Board/>)

  fireEvent.change(screen.getByPlaceholderText(/task title/i), {
    target: { value: 'Delete Me' }
  })
  fireEvent.click(screen.getByText(/add/i))

  fireEvent.click(screen.getByText(/delete/i))

  expect(screen.queryByText('Delete Me')).toBeNull()
})
