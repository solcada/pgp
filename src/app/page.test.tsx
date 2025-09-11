import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Home from './page'

describe('Home Page', () => {
  it('allows setting the specialty drug cost', async () => {
    const user = userEvent.setup()
    
    render(<Home />)
    
    // Find all inputs with placeholder "Enter cost" and get the first one (specialty drug cost)
    const costInputs = screen.getAllByPlaceholderText('Enter cost')
    const specialtyDrugInput = costInputs[0] as HTMLInputElement // First one is specialty drug cost
    
    // Verify the input exists and is initially empty
    expect(specialtyDrugInput).toBeInTheDocument()
    expect(specialtyDrugInput.value).toBe('')
    
    // Type a value into the input
    await user.type(specialtyDrugInput, '50000')
    
    // Verify the value was set
    expect(specialtyDrugInput.value).toBe('50000')
  })
  
  it('clears the specialty drug cost when input is empty', async () => {
    const user = userEvent.setup()
    
    render(<Home />)
    
    // Find the specialty drug cost input (first one)
    const costInputs = screen.getAllByPlaceholderText('Enter cost')
    const specialtyDrugInput = costInputs[0] as HTMLInputElement
    
    // First set a value
    await user.type(specialtyDrugInput, '25000')
    expect(specialtyDrugInput.value).toBe('25000')
    
    // Clear the input
    await user.clear(specialtyDrugInput)
    
    // Verify it's empty
    expect(specialtyDrugInput.value).toBe('')
  })

  it('displays the ROI value', async () => {
    render(<Home />)

    // Find the ROI label
    const roiLabel = screen.getByText('ROI:')
    expect(roiLabel).toBeInTheDocument()

    // Find the ROI value span (next sibling)
    const roiContainer = roiLabel.closest('div')
    const roiValueSpan = roiContainer?.querySelector('.text-sm.font-medium') as HTMLSpanElement

    // Verify the ROI value span exists and shows initial value
    expect(roiValueSpan).toBeInTheDocument()
    expect(roiValueSpan.textContent).toBe('0%')
  })
})