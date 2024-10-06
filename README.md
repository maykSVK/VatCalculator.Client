
# VAT Calculator Web Client

This repository contains the client-side code for the VAT Calculator web application. The application allows users to calculate Net, Gross, and VAT amounts for purchases made in Austria by entering one of the amounts and a valid Austrian VAT rate.

## Features

- Input any of the Net, Gross, or VAT amounts.
- Automatically calculates the other two missing values.
- Responsive web design for all standard desktop resolutions.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maykSVK/VatCalculator.Client.git
   ```

2. Navigate to the project directory:
   ```bash
   cd VatCalculator.Client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:4200`.

## Usage

- Enter either the Net, Gross, or VAT amount, and select a valid Austrian VAT rate (10%, 13%, or 20%).
- The other values will be automatically calculated and displayed.
- Error messages will be shown if inputs are missing, invalid, or more than one input is provided.
