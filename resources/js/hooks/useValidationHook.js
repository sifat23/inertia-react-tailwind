import {useState} from "react";

export default function useValidationHook(schema, data, setData) {
    const [validationErrors, setValidationErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleBlur = async (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        try {
            await schema.validateAt(field, data);
            setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
        } catch (err) {
            setValidationErrors((prev) => ({ ...prev, [field]: err.message }));
        }
    };

    // Handle change (live validation if touched)
    const handleChange = (field, value) => {
        setData(field, value);

        if (touched[field]) {
            schema
                .validateAt(field, { ...data, [field]: value })
                .then(() => {
                    setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
                })
                .catch((err) => {
                    setValidationErrors((prev) => ({ ...prev, [field]: err.message }));
                });
        }
    };

    const validateForm = async () => {
        try {
            await schema.validate(data, { abortEarly: false });
            setValidationErrors({});
            return true;
        } catch (err) {
            const newErrors = {};
            err.inner.forEach((e) => {
                newErrors[e.path] = e.message;
            });
            setValidationErrors(newErrors);
            return false;
        }
    };


    return {
        validationErrors,
        touched,
        handleBlur,
        handleChange,
        validateForm,
    };
}
