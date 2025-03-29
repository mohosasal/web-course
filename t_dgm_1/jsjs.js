const CONFIG = {
    DECIMAL_PLACES: 2,
    DEFAULT_VALUE: 0,
    ERROR_MESSAGES: {
        INVALID_INPUT: 'Invalid Input',
        INVALID_FORMULA: 'Invalid Formula'
    }
};

const Utils = {
    isNumericValue(value) {
        return value !== '' && !isNaN(value) && isFinite(parseFloat(value));
    },

    formatNumber(number) {
        return typeof number === 'number' ? number.toFixed(CONFIG.DECIMAL_PLACES) : CONFIG.ERROR_MESSAGES.INVALID_FORMULA;
    },

    extractVariables(expression) {
        const variablePattern = /\b[a-zA-Z_]+\b/g;
        return expression.match(variablePattern) || [];
    }
};

class ExpressionValidator {
    static validate(expression, parameters) {
        try {
            const variables = Utils.extractVariables(expression);
            const hasInvalidVariables = variables.some(variable => !(variable in parameters));
            
            if (hasInvalidVariables) return false;

            const testExpression = this.createTestExpression(expression, variables);
            new Function('return ' + testExpression)();
            return true;
        } catch (error) {
            return false;
        }
    }

    static createTestExpression(expression, variables) {
        let testFormula = expression;
        variables.forEach(variable => {
            testFormula = testFormula.replace(new RegExp(`\\b${variable}\\b`, 'g'), '1');
        });
        return testFormula;
    }
}

// Expression evaluator
class ExpressionEvaluator {
    static evaluate(expression, parameters) {
        try {
            let processedExpression = expression;
            for (const [parameterId, parameterValue] of Object.entries(parameters)) {
                const parameterPattern = new RegExp(`\\b${parameterId}\\b`, 'g');
                processedExpression = processedExpression.replace(parameterPattern, parameterValue);
            }
            return new Function('return ' + processedExpression)();
        } catch (error) {
            return CONFIG.ERROR_MESSAGES.INVALID_FORMULA;
        }
    }
}

class UIManager {
    constructor() {
        this.parameterInputs = new Map();
        this.expressionElements = [];
        this.resultDisplays = new Map();
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
        this.initializeResultDisplays();
    }

    initializeResultDisplays() {
        this.expressionElements.forEach((_, index) => {
            const resultDisplay = document.querySelector(`.result[data-formula="${index}"] span:last-child`);
            if (resultDisplay) {
                this.resultDisplays.set(index, resultDisplay);
            }
        });
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
            
            if (Utils.isNumericValue(rawValue)) {
                parameterValues[parameterId] = parseFloat(rawValue);
            } else {
                input.classList.add('invalid');
                hasValidInputs = false;
                parameterValues[parameterId] = CONFIG.DEFAULT_VALUE;
            }
        });

        return { parameterValues, hasValidInputs };
    }

    updateAllResults() {
        const { parameterValues, hasValidInputs } = this.collectParameterValues();

        this.expressionElements.forEach((expressionElement, index) => {
            const expressionText = expressionElement.getAttribute('evaluator');
            const resultDisplay = this.resultDisplays.get(index);
            
            if (resultDisplay) {
                resultDisplay.textContent = this.generateResultMessage(expressionText, parameterValues, hasValidInputs);
            }
        });
    }

    generateResultMessage(expression, parameters, hasValidInputs) {
        if (!hasValidInputs) return CONFIG.ERROR_MESSAGES.INVALID_INPUT;
        if (!ExpressionValidator.validate(expression, parameters)) return CONFIG.ERROR_MESSAGES.INVALID_FORMULA;
        
        const computedResult = ExpressionEvaluator.evaluate(expression, parameters);
        return Utils.formatNumber(computedResult);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UIManager();
});