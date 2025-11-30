import React, { useState } from 'react';
import { PassData } from './types';
import { DEFAULT_PASS_DATA } from './constants';
import { PassForm } from './components/PassForm';
import { PassPreview } from './components/PassPreview';

const App: React.FC = () => {
  const [passData, setPassData] = useState<PassData>(DEFAULT_PASS_DATA);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex h-screen max-w-[1920px] flex-col overflow-hidden lg:flex-row">
        
        <div className="h-full w-full overflow-hidden border-r border-gray-200 bg-white lg:w-[500px] xl:w-[600px] shadow-xl z-10">
          <PassForm data={passData} onChange={setPassData} />
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100/50 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            <PassPreview data={passData} />
        </div>
      </div>
    </div>
  );
};

export default App;