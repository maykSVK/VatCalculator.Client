
# VAT Calculator Web Client

This repository contains the client-side code for the VAT Calculator web application. The application allows users to calculate Net, Gross, and VAT amounts for purchases made in Austria by entering one of the amounts and a valid Austrian VAT rate.

## Features

- Input any of the Net, Gross, or VAT amounts.
- Automatically calculates the other two missing values.
- Validates VAT rates (10%, 13%, 20%) and provides error messages for invalid inputs.
- Responsive web design for all standard desktop resolutions.
- Browser support: Mozilla Firefox, Google Chrome, Microsoft Edge.

## Technologies Used

- React (or other front-end framework used).
- CSS for responsiveness.
- Axios (if applicable) for making API requests to the server.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/client-repo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd client-repo
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Usage

- Open the application in a supported browser (Firefox, Chrome, Edge).
- Enter either the Net, Gross, or VAT amount, and select a valid Austrian VAT rate (10%, 13%, or 20%).
- The other values will be automatically calculated and displayed.
- Error messages will be shown if inputs are missing, invalid, or more than one input is provided.

## Contributing

Feel free to submit issues and pull requests. Please make sure to test your changes thoroughly.

## License

This project is licensed under the MIT License.
