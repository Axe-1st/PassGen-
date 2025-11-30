import React from 'react';
import { PassData, PassType } from '../types';
import { QrCode, CreditCard, ScanLine } from 'lucide-react';
import QRCode from 'react-qr-code'; 

interface PassPreviewProps {
  data: PassData;
}

export const PassPreview: React.FC<PassPreviewProps> = ({ data }) => {
  const isApple = data.type === PassType.APPLE;

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-8">
      <div className="mb-6 flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm">
        {isApple ? <CreditCard size={16} /> : <ScanLine size={16} />}
        {isApple ? 'Apple Wallet Preview' : 'Google Pay Preview'}
      </div>

      <div className="relative h-[600px] w-full max-w-[360px]">
        {isApple ? (
          <div 
            className="flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] shadow-2xl transition-all duration-500"
            style={{ backgroundColor: data.backgroundColor }}
          >
            <div className="relative p-5">
              <div className="flex items-center justify-between">
                {data.logoImage ? (
                    <img src={data.logoImage} alt="Logo" className="h-8 w-auto object-contain" />
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-white/20">
                        <CreditCard className="text-white" size={16} />
                    </div>
                )}
                <span className="text-xl font-semibold" style={{ color: data.foregroundColor }}>
                  {data.logoText}
                </span>
              </div>
            </div>

            <div className="relative flex-1 p-5">
               {data.backgroundImage && (
                 <div className="absolute inset-0 opacity-30">
                     <img src={data.backgroundImage} className="h-full w-full object-cover" alt="bg" />
                 </div>
               )}
               
               <div className="relative z-10 grid grid-cols-2 gap-4">
                  {data.fields.map((field, idx) => (
                    <div key={idx} className={idx === 0 ? "col-span-2" : ""}>
                      <div className="text-[10px] uppercase font-semibold tracking-wider opacity-80" style={{ color: data.labelColor }}>
                        {field.label}
                      </div>
                      <div className="text-xl font-medium" style={{ color: data.foregroundColor }}>
                        {field.value}
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative flex min-h-[180px] flex-col items-center justify-center bg-white p-6">
               <div className="absolute -top-3 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-gray-100" />
               <div className="absolute -top-3 right-0 h-6 w-6 translate-x-1/2 rounded-full bg-gray-100" />
               
               <div className="mb-4 h-32 w-32">
                 <QRCode
                    value={data.barcodeValue}
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}
                />
               </div>
               <div className="text-xs text-gray-500 font-mono">
                 {data.barcodeValue}
               </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500">
            <div className="relative h-48 w-full bg-gray-900">
              {data.backgroundImage ? (
                  <img src={data.backgroundImage} className="h-full w-full object-cover" alt="Hero" />
              ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-800">
                     <span className="text-gray-500">No Cover Image</span>
                  </div>
              )}
              <div className="absolute bottom-4 left-4 h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-white shadow-md">
                 {data.logoImage ? (
                    <img src={data.logoImage} className="h-full w-full object-contain p-1" alt="Logo" />
                 ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ScanLine size={20} className="text-gray-500"/>
                    </div>
                 )}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-normal text-gray-900">{data.fields[0].value}</h2>
              <p className="text-sm text-gray-500">{data.organizationName}</p>
              
              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                 <div>
                    <div className="text-xs text-gray-500">{data.fields[1].label}</div>
                    <div className="text-lg font-medium text-gray-900">{data.fields[1].value}</div>
                 </div>
                 <div className="h-10 w-10">
                    <QRCode
                        value={data.barcodeValue}
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                    />
                 </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-gray-50 px-6 py-4">
               <span className="text-xs font-medium text-gray-500">Powered by Google Pay</span>
               <ScanLine size={16} className="text-gray-400"/>
            </div>
          </div>
        )}
      </div>
      <p className="mt-8 text-center text-sm text-gray-400 max-w-xs">
        {isApple 
            ? "Requires a valid developer certificate for actual distribution." 
            : "Generates a JSON object structure for the Google Wallet API."}
      </p>
    </div>
  );
};