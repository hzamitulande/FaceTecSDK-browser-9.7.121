# Prerequisites

1. Install Node.js (https://nodejs.org/en).
2. Run "node -v".
   - The Browser SDK and Sample App should be tested and run on the latest Node.js version.
            
## QuickStart
            
(Run Server and launch Sample App Menu)
1. Open terminal from the extracted directory (this directory).
2. Run "npm install".
3. Run "npm run facetec-browser-sdk".
   a. If your Browser does not open automatically, navigate to "localhost:8000".
            
(Build the Sample App itself)
1. For the TypeScript Sample App, open a new terminal in sample-apps/sample-app-ts/.
2. Follow the steps in that directory's README (summarized below for convenience):
   a. Run "npm install".
   b. Run "npm run build" (compiles the typescript files into the ./build folder).
      - Terminal is left running after "Build: 1 SampleApp.js Completed" is reached.
3. Select "Sample App TS" from the main menu on localhost:8000.
            
### Known Issues
            
1. "npm install" hangs on Windows.
   a. If the install hangs on Windows, temporarily turn off IPv6.
      1. Go to Control Panel->Network and Internet->Network and Sharing Center.
      2. Click "Change Adapter Settings".
      3. Right click your connected network and choose Properties.
      4. Uncheck the box next to Internet Protocol Version 6 (TCP/IPv6).
      5. Close command prompt and reopen a new command prompt in the extracted directory.