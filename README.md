# PassGen Pro

A client-side generator for Apple Wallet (.pkpass) and Google Pay (.gpay) passes.

## Features
- Visual real-time preview
- Apple & Google format support
- Webcam QR/Barcode scanning
- Image asset handling (Logo, Background)
- Client-side ZIP generation

## Deployment to GitHub Pages

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Vite (vite.config.ts)**
   Ensure your `vite.config.ts` sets the base URL to your repository name:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',
   })
   ```

3. **Deploy**
   Run the deployment script which builds the app and pushes the `dist` folder to the `gh-pages` branch.
   ```bash
   npm run deploy
   ```
