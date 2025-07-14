import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/utils/price'

describe('formatPrice', () => {
  it('should format price correctly in EUR', () => {
    expect(formatPrice(1299)).toBe('1.299,00 €')
    expect(formatPrice(99.99)).toBe('99,99 €')
    expect(formatPrice(0)).toBe('0,00 €')
  })

  it('should handle large numbers', () => {
    expect(formatPrice(12345.67)).toBe('12.345,67 €')
  })

  it('should handle decimal numbers', () => {
    expect(formatPrice(1299.5)).toBe('1.299,50 €')
    expect(formatPrice(1299.99)).toBe('1.299,99 €')
  })
})