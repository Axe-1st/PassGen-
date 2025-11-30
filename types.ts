export enum PassType {
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE'
}

export enum BarcodeFormat {
  QR = 'PKBarcodeFormatQR',
  PDF417 = 'PKBarcodeFormatPDF417',
  AZTEC = 'PKBarcodeFormatAztec',
  CODE128 = 'PKBarcodeFormatCode128'
}

export interface PassData {
  type: PassType;
  organizationName: string;
  description: string;
  logoText: string;
  foregroundColor: string;
  backgroundColor: string;
  labelColor: string;
  barcodeValue: string;
  barcodeFormat: BarcodeFormat;
  logoImage: string | null;
  backgroundImage: string | null;
  fields: {
    label: string;
    value: string;
  }[];
}