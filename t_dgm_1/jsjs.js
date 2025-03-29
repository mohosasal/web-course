class ExpressionEvaluator {
    constructor() {
        this.parameterInputs = new Map();
        this.expressionElements = [];
        this.initialize();
    }

    initialize() {
        this.initializeParameterInputs();
        this.initializeExpressionElements();
        this.attachInputListeners();
        this.updateAllResults();
    }

    initializeParameterInputs() {
        const parameterElements = document.querySelectorAll('input[id]');
        parameterElements.forEach(element => {
            this.parameterInputs.set(element.id, element);
        });
    }

    initializeExpressionElements() {
        this.expressionElements = Array.from(document.getElementsByTagName('formula'));
    }

    attachInputListeners() {
        this.parameterInputs.forEach(input => {
            input.addEventListener('input', () => this.updateAllResults());
        });
    }

    collectParameterValues() {
        const parameterValues = {};
        let hasValidInputs = true;

        this.parameterInputs.forEach((input, parameterId) => {
            input.classList.remove('invalid');
            const rawValue = input.value.trim();
            
            if (this.isNumericValue(rawValue)) {
                parameterValues[parameterId] = parseFloat(rawValue);
            } else {
                input.classList.add('invalid');
                hasValidInputs = false;
                parameterValues[parameterId] = 0;
            }
        });

        return { parameterValues, hasValidInputs };
    }

    isNumericValue(value) {
        return value !== '' && !isNaN(value) && isFinite(parseFloat(value));
    }

    validateExpressionSyntax(expression, parameters) {
        try {
            const expressionVariables = this.findExpressionVariables(expression);
            const containsInvalidVariables = expressionVariables.some(variable => !(variable in parameters));
            
            if (containsInvalidVariables) return false;

            const testExpression = this.createTestExpression(expression, expressionVariables);
            new Function('return ' + testExpression)();
            return true;
        } catch (error) {
            return false;
        }
    }

    findExpressionVariables(expression) {
        const variablePattern = /\b[a-zA-Z_]+\b/g;
        return expression.match(variablePattern) || [];
    }

    createTestExpression(expression, variables) {
        let testFormula = expression;
        variables.forEach(variable => {
            testFormula = testFormula.replace(new RegExp(`\\b${variable}\\b`, 'g'), '1');
        });
        return testFormula;
    }

    computeExpressionResult(expression, parameters) {
        try {
            let processedExpression = expression;
            for (const [parameterId, parameterValue] of Object.entries(parameters)) {
                const parameterPattern = new RegExp(`\\b${parameterId}\\b`, 'g');
                processedExpression = processedExpression.replace(parameterPattern, parameterValue);
            }
            return new Function('return ' + processedExpression)();
        } catch (error) {
            return 'Invalid Formula';
        }
    }

    updateAllResults() {
        const { parameterValues, hasValidInputs } = this.collectParameterValues();

        this.expressionElements.forEach((expressionElement, resultIndex) => {
            const expressionText = expressionElement.getAttribute('evaluator');
            const resultDisplay = document.querySelector(`.result[data-formula="${resultIndex}"] span`);
            
            if (resultDisplay) {
                resultDisplay.textContent = this.generateResultMessage(expressionText, parameterValues, hasValidInputs);
            }
        });
    }

    generateResultMessage(expression, parameters, hasValidInputs) {
        if (!hasValidInputs) return 'Invalid Input';
        if (!this.validateExpressionSyntax(expression, parameters)) return 'Invalid Formula';
        
        const computedResult = this.computeExpressionResult(expression, parameters);
        return typeof computedResult === 'number' ? computedResult.toFixed(2) : 'Invalid Formula';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ExpressionEvaluator();
});