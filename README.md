# API-tests-with-axios

A bunch of test to play around with axios.

## Installation

Clone the project to your local machine using:

```bash
git clone
```

Open the cloned project folder. Go to Terminal and give the command to install all dependencies:

```bash
npm install
```

## Usage

To run WITHOUT a proxy set 'proxy' to 'false' in the testConfig.js file.

To run WITH a proxy set 'proxy' to 'true' in the testConfig.js file.

Then run:

```bash
npm test
```
Proxy settings can be found in the axiosProxy.js file (now configured for Fiddler usage).