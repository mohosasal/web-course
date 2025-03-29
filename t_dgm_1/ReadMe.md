# DastgarmiTamrin1Document

## Overview
This project consists of a JavaScript file (`jsjs.js`), an HTML file, and a CSS file (`styles.css`) to create a functional and styled formula validator application.

---

## `jsjs.js` File Breakdown

### 1. **Config**
- Stores all constants used throughout the file for easy reference and maintenance.

### 2. **Utils**
- A collection of helper functions that don’t belong to any specific class but are semantically useful:
  - **First Function**: Checks if a value is numeric.
  - **Second Function**: Validates if the input satisfies the number format.
  - **Third Function**: Extracts variables using regex.

### 3. **Class: `ExpressionValidator`**
- Responsible for validating formulas by performing the following steps:
  - Checks if formula variables are available using their IDs.
  - Tests formula syntax by:
    - Replacing variables with actual numbers.
    - Calculating the result.
    - If no errors occur, the formula is considered valid.

### 4. **Class: `UIManager`**
- The main class in the `jsjs.js` file that manages the UI and logic:
  - Stores inputs defined in the HTML file and references to DOM elements.
  - Handles input changes and updates the HTML dynamically.

#### Key Methods:
- **`initialize` Function**:
  - Initializes parameters.
  - Finds formula-related elements in the HTML file.
  - Adds event listeners to handle user interactions.
  
- **`collectParameterValues`**:
  - Retrieves values from input fields.
  - Validates the collected values.

- **`updateAllResults`**:
  - A critical function triggered on input changes.
  - Calls earlier functions to collect and validate inputs.
  - Updates the display with the results.

---

## Application Flow
1. User enters data into input fields.
2. `updateAllResults` is triggered on input change.
3. Inputs are collected and validated.
4. Formulas are validated using `ExpressionValidator`.
5. The display is updated with the results.

---

## `index.html` File
- Minimal setup: Uses the sample structure from the "tamrin" document.
- Enhanced with additional `<div>` and `<section>` elements for better layout.
- Styled further in `styles.css` to improve aesthetics.

---

## `styles.css` File
- Contains custom styles to enhance the visual appeal of the HTML structure.
- (Details TBD based on your specific styling choices—feel free to elaborate!)

---

## How to Run
1. Open `index.html` in a browser.
2. Interact with the input fields to see real-time validation and updates.

---

Let me know if you'd like me to refine this further or add specific details!