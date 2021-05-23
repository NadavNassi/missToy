

export function Input({ nameOfInput, label, type, handleChange, inputValue }) {
    return (
        <>
            <label htmlFor={nameOfInput}>{label}</label>
            <input type={type} id={nameOfInput} name={nameOfInput} onChange={handleChange} value={inputValue} />
        </>
    )
}