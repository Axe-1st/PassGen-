import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { X, Camera } from 'lucide-react';
import { Button } from './ui/Button';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, onScan }) => {
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleScan = (data: any) => {
    if (data) {
      onScan(data?.text || data); 
      onClose();
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError("Could not access camera. Please ensure permissions are granted.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-gray-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Camera className="h-5 w-5 text-blue-400" />
            Scan Barcode
          </h3>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-square w-full bg-black">
          {error ? (
            <div className="flex h-full items-center justify-center p-8 text-center text-red-400">
              {error}
            </div>
          ) : (
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%', height: '100%' }}
              constraints={{
                video: { facingMode: 'environment' }
              }}
            />
          )}
          
          {!error && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-64 w-64 rounded-xl border-2 border-blue-500/50 bg-blue-500/10 backdrop-blur-[2px]" />
            </div>
          )}
        </div>

        <div className="p-4 text-center">
          <p className="text-sm text-gray-400">
            Point camera at a QR code or Barcode
          </p>
          <Button variant="ghost" onClick={onClose} className="mt-4 w-full text-white hover:bg-gray-800">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};