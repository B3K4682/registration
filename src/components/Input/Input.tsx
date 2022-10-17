// Import styles
import styles from "./Input.module.css";

// React Select Imports
import Select from "react-select";

interface IInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @description
   * Size of the input
   * @example
   * size="sm" - 50%
   * size="md" - 75%
   * size="lg" - 100%
   * size="fixed" - 485px (after 767px screen width)
   */
  size?: "sm" | "md" | "lg" | "fixed";
  error?: string;
  /**
   * @description
   * Type of the input
   * @example
   * type="text" - default
   * type="email" - email
   * type="password" - password
   * type="select" - select (react-select)
   * type="file" - file
   */
  type?: "text" | "password" | "email" | "select" | "file";
  disabled?: boolean;
  required?: boolean;
  options?: { value: number; label: string }[];
}

const Input: React.FunctionComponent<IInputProps> = ({
  label,
  onChange,
  value,
  placeholder,
  size = "md",
  error,
  type = "text",
  disabled = false,
  required = false,
  options,
}) => {
  return (
    <div className={styles.input_group}>
      <label className={`${required ? styles.required : ""}`}>{label}</label>
      {type === "select" ? (
        <Select
          instanceId="react-select-1"
          options={options}
          className={`${styles[size]}`}
          onChange={(event) => onChange?.(event as any)}
        />
      ) : (
        <input
          type={type}
          accept="image/*"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles[size]}`}
          disabled={disabled}
        />
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
