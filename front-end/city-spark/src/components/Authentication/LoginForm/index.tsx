import React, { useState, useMemo, useContext, useEffect } from "react";
import { Card, CardBody, Input } from "@nextui-org/react";
import { validateEmail } from "@/utils/validations/validateEmail";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "@/contexts/LoginContext";
import AlertCard from "@/components/Common/AlertCard";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EMAIL_ERR_MSG = "This doesn't look like a valid email address";
const PASSWORD_ERR_MSG = "Password should be at least 8 characters long";
const CREDENTIAL_ERR_MSG = "The email and password don't seem right";

const LoginForm: React.FC = () => {
  const { updateCredentials, updateFormValidity } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    updateFormValidity(isValid);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8080/cityspark/user/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthError("");
        updateCredentials({ email, password });
        // You can handle successful login here (e.g., redirect to dashboard)
      } else {
        setAuthError(data.message || "Authentication failed");
      }
    } catch (error) {
      setAuthError("An error occurred during login");
    }
  };

  useEffect(() => {
    if (validateForm()) {
      updateCredentials({ email, password });
    }
  }, [email, password]);

  return (
    <Card>
      <CardBody className="gap-4">
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!emailError}
            errorMessage={emailError}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
              errorMessage={passwordError}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              }
            />
          </div>
        </div>
        {(emailError || passwordError || authError) && (
          <AlertCard
            message={emailError || passwordError || authError}
            type="error"
          />
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
