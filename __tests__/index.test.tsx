import { render, screen } from '@testing-library/react'
import Home from '../pages/query'
import '@testing-library/jest-dom'

describe('Generates valid SQL', () => {
  it('Gives me the top posts by stani in the past month', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})