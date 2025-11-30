import { PassData, PassType, BarcodeFormat } from './types';

export const DEFAULT_PASS_DATA: PassData = {
  type: PassType.APPLE,
  organizationName: 'Acme Corp',
  description: 'Membership Card',
  logoText: 'ACME',
  foregroundColor: '#FFFFFF',
  backgroundColor: '#1F2937',
  labelColor: '#9CA3AF',
  barcodeValue: '1234567890',
  barcodeFormat: BarcodeFormat.QR,
  logoImage: null,
  backgroundImage: null,
  fields: [
    { label: 'MEMBER', value: 'John Doe' },
    { label: 'LEVEL', value: 'Gold' }
  ]
};