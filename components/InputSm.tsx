type InputSmProps = {
    label: string;
    placeholder: string;
    name: string;
    value: string;
    error: boolean;
    handleChange: (e: any) => void;
}

export default function InputSm({ label, placeholder, name, value, error, handleChange }: InputSmProps) {

  const defaultBorderColor = "border-cyan-900"
  const errorBorderColor = "border-red-700"

  return (
    <div>
      <label htmlFor={label} className="mt-1 block text-sm font-medium text-cyan-900">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={label}
          name={name}
          id={label}
          className={`p-1 bg-transparent shadow-sm block w-full sm:text-sm border border-t-1 border-l-1 border-r-4 border-b-4 rounded-md ${error ? errorBorderColor : defaultBorderColor}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

InputSm.defaultProps = {
    error: false
}