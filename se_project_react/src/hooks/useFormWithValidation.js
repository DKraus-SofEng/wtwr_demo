import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues, validationRules = {}) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState({});

    // Validation function
    const validateField = useCallback(
        (name, value, allValues = values) => {
            const rules = validationRules[name];
            if (!rules) return "";

            // Required validation
            if (rules.required && (!value || value.trim() === "")) {
                return rules.required.message || `${name} is required`;
            }

            // Minimum length validation
            if (rules.minLength && value.length < rules.minLength.value) {
                return (
                    rules.minLength.message ||
                    `${name} must be at least ${rules.minLength.value} characters`
                );
            }

            // Maximum length validation
            if (rules.maxLength && value.length > rules.maxLength.value) {
                return (
                    rules.maxLength.message ||
                    `${name} must be no more than ${rules.maxLength.value} characters`
                );
            }

            // URL validation (basic)
            if (rules.pattern && !rules.pattern.value.test(value)) {
                return rules.pattern.message || `${name} format is invalid`;
            }

            // Custom validation (e.g., confirmPassword)
            if (rules.custom && typeof rules.custom.isValid === "function") {
                if (!rules.custom.isValid(value, allValues)) {
                    return rules.custom.message || `${name} is invalid`;
                }
            }

            return "";
        },
        [validationRules, values]
    );

    // Validate all fields
    const validateAllFields = useCallback(() => {
        const newErrors = {};
        let formIsValid = true;

        Object.keys(validationRules).forEach((fieldName) => {
            const error = validateField(fieldName, values[fieldName] || "");
            if (error) {
                newErrors[fieldName] = error;
                formIsValid = false;
            }
        });

        setErrors(newErrors);
        setIsValid(formIsValid);
        return formIsValid;
    }, [values, validateField, validationRules]);

    // Handle input changes with validation
    const handleChange = useCallback(
        (event) => {
            const { value, name } = event.target;

            // Update values
            const newValues = { ...values, [name]: value };
            setValues(newValues);

            // Mark field as touched
            setTouched((prev) => ({ ...prev, [name]: true }));

            // Always validate the changed field, even if empty
            const fieldError = validateField(name, value);
            const newErrors = { ...errors };

            if (fieldError) {
                newErrors[name] = fieldError;
            } else {
                delete newErrors[name];
            }

            setErrors(newErrors);

            // Check if entire form is valid
            const hasErrors = Object.values(newErrors).some(
                (error) => error !== ""
            );
            const allRequiredFieldsFilled = Object.keys(validationRules).every(
                (fieldName) => {
                    const rules = validationRules[fieldName];
                    if (rules.required) {
                        const fieldValue =
                            fieldName === name ? value : newValues[fieldName];
                        return fieldValue && fieldValue.trim() !== "";
                    }
                    return true;
                }
            );

            setIsValid(!hasErrors && allRequiredFieldsFilled);

            // If password changes, re-validate confirmPassword
            if (name === "password" && "confirmPassword" in validationRules) {
                const confirmError = validateField(
                    "confirmPassword",
                    newValues["confirmPassword"] || "",
                    newValues
                );
                if (confirmError) {
                    newErrors["confirmPassword"] = confirmError;
                } else {
                    delete newErrors["confirmPassword"];
                }
            }
        },
        [values, errors, validateField, validationRules]
    );

    // Handle blur events for immediate validation feedback
    const handleBlur = useCallback(
        (event) => {
            const { name } = event.target;
            setTouched((prev) => ({ ...prev, [name]: true }));

            // Trigger validation for the field that lost focus
            const fieldError = validateField(name, values[name] || "");
            const newErrors = { ...errors };

            if (fieldError) {
                newErrors[name] = fieldError;
            } else {
                delete newErrors[name];
            }

            setErrors(newErrors);
        },
        [values, errors, validateField]
    );

    // Reset form
    const handleReset = useCallback(() => {
        setValues(defaultValues);
        setErrors({});
        setTouched({});
        setIsValid(false);
    }, [defaultValues]);

    // Get error for specific field
    const getFieldError = useCallback(
        (fieldName) => {
            return errors[fieldName] || "";
        },
        [errors]
    );

    // Check if specific field is valid
    const isFieldValid = useCallback(
        (fieldName) => {
            return !errors[fieldName];
        },
        [errors]
    );

    return {
        values,
        errors,
        isValid,
        touched,
        handleChange,
        handleBlur,
        handleReset,
        setValues,
        validateAllFields,
        getFieldError,
        isFieldValid,
    };
}
