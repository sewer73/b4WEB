import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredTravels } from '@/hooks/useFilteredTravels'
import { Travel, SortOption } from '@/types/travel'

const mockTravels: Travel[] = [
  {
    id: '1',
    title: 'Adventure in the Alps',
    location: 'Switzerland',
    price: 1299,
    rating: 4.8,
    reviewCount: 124,
    duration: '7 days',
    group_size: '8-12 people',
    activity: 'adventure',
    likes: 89,
    isLiked: false,
    imgUrl: 'test1.jpg',
  },
  {
    id: '2',
    title: 'Cultural Tour of Japan',
    location: 'Tokyo',
    price: 2199,
    rating: 4.9,
    reviewCount: 89,
    duration: '10 days',
    group_size: '6-10 people',
    activity: 'cultural',
    likes: 156,
    isLiked: true,
    imgUrl: 'test2.jpg',
  },
  {
    id: '3',
    title: 'Tropical Paradise Escape',
    location: 'Maldives',
    price: 3499,
    rating: 4.7,
    reviewCount: 67,
    duration: '5 days',
    group_size: '2-4 people',
    activity: 'relaxation',
    likes: 234,
    isLiked: false,
    imgUrl: 'test3.jpg',
  },
]

describe('useFilteredTravels', () => {
  it('should return all travels when no filters are applied', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, '', {
      activity: [],
      location: [],
      duration: [],
      group_size: [],
      category: [],
      sort: null,
      })
    )

    expect(result.current).toHaveLength(3)
    expect(result.current).toEqual(mockTravels)
  })

  it('should filter by search query in title', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, 'Alps', {
        activity: [],
        location: [],
        duration: [],
        group_size: [],
        category: [],
        sort: null,
      })
    )

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Adventure in the Alps')
  })

  it('should filter by search query in location', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, 'Tokyo', {
        activity: [],
        location: [],
        duration: [],
        group_size: [],
        category: [],
        sort: null,
      })
    )

    expect(result.current).toHaveLength(1)
    expect(result.current[0].location).toBe('Tokyo')
  })

  it('should filter by activity', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, '', {
        activity: ['adventure'],
        location: [],
        duration: [],
        group_size: [],
        category: [],
        sort: null,
      })
    )

    expect(result.current).toHaveLength(1)
    expect(result.current[0].activity).toBe('adventure')
  })

  it('should sort by rating (best rated)', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, '', {
        activity: [],
        location: [],
        duration: [],
        group_size: [],
        category: [],
        sort: SortOption.BEST_RATED,
      })
    )

    expect(result.current[0].rating).toBe(4.9)
    expect(result.current[1].rating).toBe(4.8)
    expect(result.current[2].rating).toBe(4.7)
  })

  it('should sort by price (lowest first)', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, '', {
        activity: [],
        location: [],
        duration: [],
        group_size: [],
        category: [],
        sort: SortOption.LOWEST_PRICE,
      })
    )

    expect(result.current[0].price).toBe(1299)
    expect(result.current[1].price).toBe(2199)
    expect(result.current[2].price).toBe(3499)
  })

  it('should sort by price (highest first)', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, '', {
        activity: [],
        location: [],
        duration: [],
        group_size: [],
        category: [],
        sort: SortOption.HIGHEST_PRICE,
      })
    )

    expect(result.current[0].price).toBe(3499)
    expect(result.current[1].price).toBe(2199)
    expect(result.current[2].price).toBe(1299)
  })

  it('should combine search and filters', () => {
    const { result } = renderHook(() =>
      useFilteredTravels(mockTravels, 'Adventure', {
        activity: ['adventure'],
        location: [],
        duration: [],
        group_size: [],
        category: [],
        sort: null,
      })
    )

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Adventure in the Alps')
    expect(result.current[0].activity).toBe('adventure')
  })
})