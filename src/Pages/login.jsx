import { useState, useEffect } from "react";
import "./css/login.css";
import InputField from "../Components/InputField";
import logoLarge from "../assets/images/logo-devlinks-large.svg";
import emailIcon from "../assets/images/icon-email.svg";
import passwordIcon from "../assets/images/icon-password.svg";
import Button from "../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [disable, setDisable] = useState(false);

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            userLogin();
        }
    };

    const userLogin = async () => {
        try {
            setDisable(true);
            !email ? setEmailError(true) : setEmailError(false);
            !password ? setPasswordError(true) : setEmailError(false);
            if (!email || !password) {
                return;
            }
            const res = await axios.post(
                import.meta.env.VITE_BE_URL + "/api/auth/login",
                {
                    email,
                    password,
                },
            );
            console.log("res", res);
            Cookies.set("jwt", res.data.token, { expires: 7 });
            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                toast.error("No response from server", {
                    duration: 2000,
                    position: "bottom-center",
                    style: {
                        backgroundColor: "var(--black-90-)",
                        color: "var(--white-90-)",
                    },
                });
                console.error("No Server Response", err.response.data);
            } else {
                toast.error("Invalid email or password", {
                    duration: 2000,
                    position: "bottom-center",
                    style: {
                        backgroundColor: "var(--black-90-)",
                        color: "var(--white-90-)",
                    },
                });
                console.error("Login Failed", err.response.data);
            }
        } finally {
            setDisable(false);
        }
    };

    return (
        <div className="login-container">
            <div className="auth-logo">
                <h1>SMIT ATTENDANCE</h1>
            </div>
            <div className="login-card">
                <div className="login-head">
                    <h2>Login</h2>
                </div>
                <div className="login-fields">
                    <InputField
                        value={email}
                        error={emailError}
                        onInputChange={(emailVal) => setEmail(emailVal)}
                        label="Email address"
                        iconSrc={emailIcon}
                        altText="Email"
                        placeholderText="e.g. alex@email.com"
                    />
                    <InputField
                        value={password}
                        error={passwordError}
                        onInputChange={(passVal) => setPassword(passVal)}
                        label="Password"
                        type="password"
                        iconSrc={passwordIcon}
                        altText="Password"
                        placeholderText="Enter your password"
                        onKeyPress={handleEnterKeyPress}
                    />

                    <Button
                        disabled={disable}
                        loadingText={disable && "Logging in..."}
                        handleClick={userLogin}
                        buttonText="Login"
                    />
                    {/* <p>
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="create-account"
                        >
                            Create account
                        </span>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Login;
