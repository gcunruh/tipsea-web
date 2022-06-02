type InputLgProps = {
    label: string;
    placeholder: string;
}

export default function InputLg({ label, placeholder}: InputLgProps) {
  return (
    <div>
      <label htmlFor={label} className="mt-1 block text-sm font-medium text-cyan-900">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          name={label}
          id={label}
          className="p-1 bg-transparent shadow-sm block w-full sm:text-sm border border-t-1 border-cyan-900 border-l-1 border-r-4 border-b-4 rounded-md"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}