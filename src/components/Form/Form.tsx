// React Imports
import React, { useEffect, useState } from "react";

// Import styles
import styles from "./Form.module.css";

// Import components
import { Input } from "..";

// Import Types
import { Car } from "../../util/types";

// Import react toast
import toast from "react-hot-toast";

interface IFormProps {
  data: Car;
}

const Form: React.FunctionComponent<IFormProps> = ({ data }) => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iBan, setIBan] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [carModel, setCarModel] = useState<object | undefined | any>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [requiredValid, setRequiredValid] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  // Map api data for select options
  const result = data?.map((car) => car);
  const options = result?.map(({ id, model }) => ({ value: id, label: model }));

  // Live validation
  useEffect(() => {
    // Email validation
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
    );
    if (email.length > 0 && !emailRegex.test(email)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
    // Password validation
    if (password.length > 0 && password.length < 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
    // Confirm password validation
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordValid(true);
    }
  }, [email, password, confirmPassword]);

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled
    setRequiredValid([
      email.length > 0,
      password.length > 0,
      confirmPassword.length > 0,
      bankName.length > 0,
      accountNumber.length > 0,
      iBan.length > 0,
      carModel !== undefined,
      file !== undefined,
    ]);

    // Check if all fields are valid
    if (
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      bankName.length > 0 &&
      accountNumber.length > 0 &&
      iBan.length > 0 &&
      carModel !== undefined &&
      file !== undefined
    ) {
      // For json file
      const encryptedPassword = btoa(password);
      const fileName = file?.name;
      const fileExtension = fileName?.split(".").pop();
      const carModelLabel = carModel?.label;
      const data = {
        email,
        password,
        hashedPassword: encryptedPassword,
        bankName,
        accountNumber,
        iBan,
        insuranceNumber,
        carModel: carModelLabel,
        file: fileName,
        fileExtension,
      };
      // Save to JSON
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "data.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Success toast
      toast.success("Form submitted successfully!");

      // Clear all fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setBankName("");
      setAccountNumber("");
      setIBan("");
      setInsuranceNumber("");
      setCarModel(undefined);
      setFile(undefined);
    }
  };

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form}>
        <div className={styles.card}>
          <div>
            <h2 className={styles.title}>Registration Form</h2>
            <form onSubmit={() => console.log("submitted")}>
              <Input
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                {...(emailValid ? {} : { error: "Invalid email" })}
                {...(requiredValid[0]
                  ? {}
                  : { error: "This field is required" })}
                size="fixed"
              />
              <div className={styles.form_group}>
                <div className={styles.form_col}>
                  <Input
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Must be 8 characters long"
                    {...(passwordValid
                      ? {}
                      : {
                          error: "Password must be at least 8 characters long",
                        })}
                    {...(requiredValid[1]
                      ? {}
                      : { error: "This field is required" })}
                  />
                </div>
                <div className={styles.form_col}>
                  <Input
                    label="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    {...(confirmPasswordValid
                      ? {}
                      : { error: "Passwords don't match" })}
                    {...(password.length === 0 || !passwordValid
                      ? { disabled: true }
                      : {})}
                    {...(requiredValid[2]
                      ? {}
                      : { error: "This field is required" })}
                  />
                </div>
              </div>
              <div className={styles.subtitle}>
                <h2>Bank Details</h2>
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_col}>
                  <Input
                    label="Bank Name"
                    onChange={(e) => setBankName(e.target.value)}
                    value={bankName}
                    required
                    {...(requiredValid[3]
                      ? {}
                      : {
                          error: "This field is required",
                        })}
                  />
                </div>
                <div className={styles.form_col}>
                  <Input
                    label="Account number"
                    onChange={(e) => setAccountNumber(e.target.value)}
                    value={accountNumber}
                    required
                    {...(requiredValid[4]
                      ? {}
                      : {
                          error: "This field is required",
                        })}
                  />
                </div>
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_col}>
                  <Input
                    label="IBAN"
                    onChange={(e) => setIBan(e.target.value)}
                    value={iBan}
                    required
                    {...(requiredValid[5]
                      ? {}
                      : {
                          error: "This field is required",
                        })}
                  />
                </div>
                <div className={styles.form_col}>
                  <Input
                    label="National insurance number"
                    onChange={(e) => setInsuranceNumber(e.target.value)}
                    value={insuranceNumber}
                  />
                </div>
              </div>
              <div className={styles.subtitle}>
                <h2>Car Details</h2>
              </div>
              <Input
                type="select"
                label="Car model"
                size="fixed"
                required
                options={options}
                onChange={(e) => setCarModel(e)}
                {...(requiredValid[6]
                  ? {}
                  : {
                      error: "This field is required",
                    })}
              />
              <Input
                type="file"
                size="fixed"
                label="Car registration picture"
                required
                options={options}
                onChange={(e) => setFile(e?.target?.files?.[0])}
                {...(requiredValid[7]
                  ? {}
                  : {
                      error: "This field is required",
                    })}
              />
              <div className={styles.form_submit}>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
