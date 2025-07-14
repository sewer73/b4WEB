import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { TravelCard } from '@/components/TravelCard'
import { Travel } from '@/types/travel'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock toast hook
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

const mockTravel: Travel = {
  id: '1',
  title: 'Adventure in the Alps',
  location: 'Switzerland',
  price: 1299,
  originalPrice: 1599,
  rating: 4.8,
  reviewCount: 124,
  duration: '7 days',
  group_size: '8-12 people',
  activity: 'adventure',
  likes: 89,
  isLiked: false,
  imgUrl: 'https://test-image.jpg',
}

describe('TravelCard', () => {
  const mockOnTravelClick = vi.fn()
  const mockOnLikeToggle = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render travel information correctly', () => {
    const { getByText } = render(
      <TravelCard
        travel={mockTravel}
        onTravelClick={mockOnTravelClick}
        onLikeToggle={mockOnLikeToggle}
      />
    )

    expect(getByText('Adventure in the Alps')).toBeInTheDocument()
    expect(getByText('Switzerland')).toBeInTheDocument()
    expect(getByText('1.299,00 €')).toBeInTheDocument()
    expect(getByText('1.599,00 €')).toBeInTheDocument()
    expect(getByText('4.8')).toBeInTheDocument()
    expect(getByText('(124 reviews)')).toBeInTheDocument()
    expect(getByText('89')).toBeInTheDocument()
  })

  it('should call onTravelClick when card is clicked', () => {
    const { container } = render(
      <TravelCard
        travel={mockTravel}
        onTravelClick={mockOnTravelClick}
        onLikeToggle={mockOnLikeToggle}
      />
    )

    const card = container.querySelector('[class*="cursor-pointer"]')
    if (card) {
      card.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    }
    expect(mockOnTravelClick).toHaveBeenCalledWith(mockTravel)
  })

  it('should call onLikeToggle when heart button is clicked', () => {
    const { getByLabelText } = render(
      <TravelCard
        travel={mockTravel}
        onTravelClick={mockOnTravelClick}
        onLikeToggle={mockOnLikeToggle}
      />
    )

    const heartButton = getByLabelText('Add to favorites')
    heartButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(mockOnLikeToggle).toHaveBeenCalledWith('1')
  })

  it('should display correct heart button label when isLiked is true', () => {
    const likedTravel = { ...mockTravel, isLiked: true }
    const { getByLabelText } = render(
      <TravelCard
        travel={likedTravel}
        onTravelClick={mockOnTravelClick}
        onLikeToggle={mockOnLikeToggle}
      />
    )

    expect(getByLabelText('Remove from favorites')).toBeInTheDocument()
  })

  it('should not display original price when not provided', () => {
    const travelWithoutOriginalPrice = { ...mockTravel, originalPrice: undefined }
    const { queryByText } = render(
      <TravelCard
        travel={travelWithoutOriginalPrice}
        onTravelClick={mockOnTravelClick}
        onLikeToggle={mockOnLikeToggle}
      />
    )

    expect(queryByText('1.599,00 €')).not.toBeInTheDocument()
  })

  it('should have proper alt text for image', () => {
    const { getByRole } = render(
      <TravelCard
        travel={mockTravel}
        onTravelClick={mockOnTravelClick}
        onLikeToggle={mockOnLikeToggle}
      />
    )

    const image = getByRole('img')
    expect(image).toHaveAttribute('alt', 'Adventure in the Alps - Switzerland')
  })
})