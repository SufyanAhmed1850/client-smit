import "./css/input.css";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const InputField = ({
    label,
    iconSrc,
    altText,
    placeholderText,
    imgYes,
    onInputChange,
    onKeyPress,
    type,
    value,
    disabled,
    index,
    error,
}) => {
    const location = useLocation();
    const [inputValue, setInputValue] = useState(value || "");
    const [isFocused, setIsFocused] = useState(false);
    const [haveError, setHaveError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        type == "password"
            ? setErrorMessage("Please check again")
            : setErrorMessage("Can’t be empty");
        error && setHaveError(true);
    }, [error]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onInputChange && onInputChange(e.target.value);
        return;
    };

    const handleInputBlur = (index) => {
        if (!inputValue) {
            type == "password"
                ? setErrorMessage("Please check again")
                : setErrorMessage("Can’t be empty");
            setHaveError(true);
        } else {
            setHaveError(false);
        }
        setIsFocused(false);
    };

    return (
        <div className="input-field-parent">
            <span>{label}</span>
            <div
                style={{
                    border: isFocused
                        ? "1px solid var(--purple-90-)"
                        : "1px solid var(--black-30-)",
                    boxShadow: isFocused ? "0 0 32px 0 #633cff40" : "none",
                    ...(haveError
                        ? { border: "1px solid var(--red-90-)" }
                        : {}),
                }}
                className="input-container"
            >
                {imgYes || (
                    <div>
                        <img src={iconSrc} alt={altText} />
                    </div>
                )}
                <input
                    disabled={disabled && disabled}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleInputBlur}
                    onKeyDown={onKeyPress || null}
                    type={type || "text"}
                    placeholder={placeholderText}
                />

                {haveError && (
                    <span className="input-error">{errorMessage}</span>
                )}
            </div>
            {label == "Create password" && (
                <p className="password-hint">
                    At least one lowercase letter, uppercase letter, and number
                </p>
            )}
        </div>
    );
};

export default InputField;
