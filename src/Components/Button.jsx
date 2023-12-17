import "./css/button.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Button = ({ buttonText, loadingText, handleClick, disabled }) => {
    return (
        <button
            disabled={disabled && disabled}
            onClick={handleClick || null}
            className="button"
        >
            {disabled && (
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 16,
                                color: "white",
                            }}
                            spin
                        />
                    }
                />
            )}
            <h3>{disabled ? loadingText : buttonText}</h3>
        </button>
    );
};
export default Button;
