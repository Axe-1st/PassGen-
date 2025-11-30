import React, { useState, useRef } from 'react';
import { PassData, PassType, BarcodeFormat } from '../types';
import { Download, ScanLine, ImagePlus, RefreshCw, Smartphone, CreditCard } from 'lucide-react';
import { Button } from './ui/Button';
import { ScannerModal } from './ScannerModal';
import { generatePassPackage } from '../services/passGenerator';

interface PassFormProps {
  data: PassData;
  onChange: (data: PassData) => void;
}

export const PassForm: React.FC<PassFormProps> = ({ data, onChange }) => {
  const [isScanning, setIsScanning] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof PassData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleFieldChange = (index: number, key: 'label' | 'value', value: string) => {
    const newFields = [...data.fields];
    newFields[index] = { ...newFields[index], [key]: value };
    handleChange('fields', newFields);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: 'logoImage' | 'backgroundImage') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    await generatePassPackage(data);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <ScannerModal 
        isOpen={isScanning} 
        onClose={() => setIsScanning(false)} 
        onScan={(val) => handleChange('barcodeValue', val)} 
      />

      <div className="border-b border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Pass Designer</h1>
        <p className="text-sm text-gray-500">Configure your digital pass details.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-8">
          
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-900">Platform</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleChange('type', PassType.APPLE)}
                className={`flex items-center justify-center gap-2 rounded-lg border p-4 transition-all ${
                  data.type === PassType.APPLE
                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <CreditCard size={20} />
                <span className="font-medium">Apple Wallet</span>
              </button>
              <button
                onClick={() => handleChange('type', PassType.GOOGLE)}
                className={`flex items-center justify-center gap-2 rounded-lg border p-4 transition-all ${
                  data.type === PassType.GOOGLE
                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Smartphone size={20} />
                <span className="font-medium">Google Pay</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <ImagePlus size={16} /> Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => logoInputRef.current?.click()}
                className="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:bg-gray-100"
              >
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logoImage')} />
                {data.logoImage ? (
                    <img src={data.logoImage} className="h-10 w-10 object-contain" alt="Logo" />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 group-hover:bg-gray-300" />
                )}
                <span className="text-xs font-medium text-gray-600">Upload Logo</span>
              </div>

              <div 
                onClick={() => bgInputRef.current?.click()}
                className="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:bg-gray-100"
              >
                <input ref={bgInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'backgroundImage')} />
                {data.backgroundImage ? (
                    <img src={data.backgroundImage} className="h-10 w-10 object-cover rounded" alt="BG" />
                ) : (
                    <div className="h-10 w-10 rounded bg-gray-200 group-hover:bg-gray-300" />
                )}
                <span className="text-xs font-medium text-gray-600">Background</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">General Information</h3>
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Organization Name</label>
                <input
                  type="text"
                  value={data.organizationName}
                  onChange={(e) => handleChange('organizationName', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Pass Description</label>
                <input
                  type="text"
                  value={data.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Logo Text (Header)</label>
                <input
                  type="text"
                  value={data.logoText}
                  onChange={(e) => handleChange('logoText', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {data.type === PassType.APPLE && (
             <div className="space-y-4">
               <h3 className="text-sm font-semibold text-gray-900">Colors</h3>
               <div className="grid grid-cols-3 gap-4">
                 <div>
                   <label className="mb-1 block text-xs font-medium text-gray-500">Background</label>
                   <div className="flex gap-2">
                       <input 
                         type="color" 
                         value={data.backgroundColor} 
                         onChange={(e) => handleChange('backgroundColor', e.target.value)}
                         className="h-9 w-9 cursor-pointer rounded border-0 p-0"
                       />
                       <input 
                         type="text"
                         value={data.backgroundColor}
                         onChange={(e) => handleChange('backgroundColor', e.target.value)}
                         className="w-full min-w-0 rounded-md border border-gray-300 px-2 py-2 text-xs uppercase"
                       />
                   </div>
                 </div>
                 <div>
                   <label className="mb-1 block text-xs font-medium text-gray-500">Text</label>
                   <div className="flex gap-2">
                       <input 
                         type="color" 
                         value={data.foregroundColor} 
                         onChange={(e) => handleChange('foregroundColor', e.target.value)}
                         className="h-9 w-9 cursor-pointer rounded border-0 p-0"
                       />
                        <input 
                         type="text"
                         value={data.foregroundColor}
                         onChange={(e) => handleChange('foregroundColor', e.target.value)}
                         className="w-full min-w-0 rounded-md border border-gray-300 px-2 py-2 text-xs uppercase"
                       />
                   </div>
                 </div>
                 <div>
                   <label className="mb-1 block text-xs font-medium text-gray-500">Label</label>
                   <div className="flex gap-2">
                       <input 
                         type="color" 
                         value={data.labelColor} 
                         onChange={(e) => handleChange('labelColor', e.target.value)}
                         className="h-9 w-9 cursor-pointer rounded border-0 p-0"
                       />
                        <input 
                         type="text"
                         value={data.labelColor}
                         onChange={(e) => handleChange('labelColor', e.target.value)}
                         className="w-full min-w-0 rounded-md border border-gray-300 px-2 py-2 text-xs uppercase"
                       />
                   </div>
                 </div>
               </div>
             </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Barcode & Data</h3>
                <Button size="sm" variant="outline" onClick={() => setIsScanning(true)} className="gap-2">
                    <ScanLine size={14} /> Scan
                </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Message / Value</label>
                <input
                  type="text"
                  value={data.barcodeValue}
                  onChange={(e) => handleChange('barcodeValue', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Primary Field (Label)</label>
                    <input
                        type="text"
                        value={data.fields[0].label}
                        onChange={(e) => handleFieldChange(0, 'label', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Primary Field (Value)</label>
                    <input
                        type="text"
                        value={data.fields[0].value}
                        onChange={(e) => handleFieldChange(0, 'value', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Secondary Field (Label)</label>
                    <input
                        type="text"
                        value={data.fields[1].label}
                        onChange={(e) => handleFieldChange(1, 'label', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Secondary Field (Value)</label>
                    <input
                        type="text"
                        value={data.fields[1].value}
                        onChange={(e) => handleFieldChange(1, 'value', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-6 bg-gray-50">
        <Button onClick={handleDownload} className="w-full gap-2 text-sm h-11" size="lg">
          <Download size={18} />
          {data.type === PassType.APPLE ? 'Generate .pkpass bundle' : 'Generate Google Pay JSON'}
        </Button>
      </div>
    </div>
  );
};