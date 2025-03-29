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

## usages of AI in this Tamrin

as you know, in today programing workflow, AIs have become a inseparatable part of developing! anyone does not use it will absolutly get lagged! but! but there are important considerations :

1. we should not use AI codes and ... without learning or knowing what is going on!
2. the programmer should have a percise knowlodege and just use the AI to fasten his workflow or getting recomendations

so how i used AI in this Tamrin ?

1. first i learn the concepts (i already have some familiarities with web programing )
2. i try to implement my very initial structure, functions and their flow
3. i try to implement a basic implementation of the code that works !
4. if it was ok , then i use AI to get recomendations for improving my code strucre, design or implementing complimentary functionalities like in validating
5. if i have no idea of the way i want to do things, i ask AI about it
6. finally i give my code to AI to analyze it and make it clean and if i agree with that i use it !
