DastgarmiTamrin1Document

jsjs.js file :

Config : i've stored all constants of the file in this

Utils: this const contains helper function that don't belong to any class semantically but thery are usefull

first function check if the value is mumeric
second functins checks if the input satisfy the number format
the third extrcts the variables by rejex

class ExpressionValidator : as the name implies, this class is responsilbe for validating formulas by :
- check if the formula varibales are available by their ids
- then tests the formula syntax (as you can see , it replace the variables by actual numbers then calculate it and if it does not face any error, its valid )

UI Manager: this is the main class in the js file and it :
- stores inputs defined in the html file and DOM references
- handles inputs and updateing the html

in the initialize function :
- initialize parameters
- then find forula elements in the html file
- the adds event listeners

collectParameterValues : gets values of inputs fields then validate

updateAllResults : this function is a important function that trrigers on input changes
then it calls the function erliers and finally update the display


so what is the whole flow ?

- entering in inputs fields
- updateAllResults is trrigerd
- inputs are collected and validated
- also formulas
- then display 

html file :

- nothing ! i just used the sample in the tamrin doc then i add some div and sections to make it more beutifull in the styles.css

css file :

?
