import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const mockpaymentDetails: PaymentDetails = { amount: 555, currency: 'euro', method: PaymentMethod.CreditCard, cardNumber: 'AZERTTY123' };

    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    const mockProcessPaymentResponse = { status: 'success', transactionId: 'txn_1234567890' }

    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation((mockpaymentDetails: PaymentDetails) => mockProcessPaymentResponse);


    // Act
    const result = paymentService.makePayment(mockpaymentDetails);
    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    expect(result).toEqual(`Payment successful. Transaction ID: ${mockProcessPaymentResponse.transactionId}`);
    // Check that processPayment inside makePayment has been called with paymentDetails
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(mockpaymentDetails);
  });

  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const mockpaymentDetails: PaymentDetails = { amount: 1555, currency: 'euro', method: PaymentMethod.PayPal, cardNumber: 'QWERTY12345' };

    //TODO: Create mockProcessPaymentResponse object containing failure status
    const mockProcessPaymentResponse: Object = { status: 'failure' }

    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation((mockpaymentDetails: PaymentDetails) => mockProcessPaymentResponse);

    // Act & Assert
    expect(() => paymentService.makePayment(mockpaymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const mockpaymentDetails: PaymentDetails = { amount: -1555, currency: 'euro', method: PaymentMethod.PayPal, cardNumber: 'QWERTY12345' };

    // Act & Assert
    expect(() => paymentService.makePayment(mockpaymentDetails)).toThrow('Invalid payment amount');
  });
});
