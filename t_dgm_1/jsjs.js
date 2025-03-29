class SomeFuccingClass {
    constructor() {
        this.inputFileds = {};
        this.formulas = [];
        this.init();
    }

    init() {
        const inputElements = document.querySelectorAll('input[id]');
        inputElements.forEach(input => {
            this.inputFileds[input.id] = input;
        });

        this.formulas = Array.from(document.getElementsByTagName('formula'));

        Object.values(this.inputFileds).forEach(input => {
            input.addEventListener('input', () => this.doTheMath());
        });

        this.calculateAll();
    }

    fetchInputs() {
        const values = {};
        let isValid = true;

        Object.values(this.inputs).forEach(input => input.classList.remove('invalid'));

        for (const [id, input] of Object.entries(this.inputs)) {
            const value = input.value.trim();
            if (value === '' || isNaN(value) || !isFinite(parseFloat(value))) {
                input.classList.add('invalid');
                isValid = false;
                values[id] = 0;
            } else {
                values[id] = parseFloat(value);
            }
        }

        return { values, isValid };
    }

    validate(formula,Inputs) {
        try {
            const varRegex = /\b[a-zA-Z_]+\b/g;
            const variables = formula.match(varRegex) || [];

            const invalidVars = variables.filter(varName => !(varName in availableInputs));
            if (invalidVars.length > 0) {
                return false; 
            }

            let testExpression = formula;
            for (const id of variables) {
                testExpression = testExpression.replace(new RegExp(`\\b${id}\\b`, 'g'), '1');
            }
            new Function('return ' + testExpression)(); 
            return true;
        } catch (error) {
            return false;
        }
    }

    evaluate(formula, values) {
        try {
            let expression = formula;
            for (const [id, value] of Object.entries(values)) {
                const regex = new RegExp(`\\b${id}\\b`, 'g');
                expression = expression.replace(regex, value);
            }
            return new Function('return ' + expression)();
        } catch (error) {
            return 'Invalid Formula';
        }
    }

    doTheMath() {
        const { values, isValid } = this.getInputValues();

        this.formulas.forEach((formula, index) => {
            const evaluator = formula.getAttribute('evaluator');
            const outputElement = document.querySelector(`.result[data-formula="${index}"] span`);
            
            if (outputElement) {
                if (!isValid) {
                    outputElement.textContent = 'Invalid Input';
                } else if (!this.validate(evaluator, values)) {
                    outputElement.textContent = 'Invalid Formula';
                } else {
                    const result = this.evaluate(evaluator, values);
                    outputElement.textContent = 
                        typeof result === 'number' ? result.toFixed(2) : 'Invalid Formula';
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SomeFuccingClass();
});