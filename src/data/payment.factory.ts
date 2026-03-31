import type { PaymentDetails } from '../pages/payment.page';

export const createPaymentDetails = (): PaymentDetails => ({
  nameOnCard: 'Playwright Portfolio Tester',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2030'
});
