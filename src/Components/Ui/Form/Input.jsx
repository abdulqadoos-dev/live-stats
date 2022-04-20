import React from 'react'

export default function Input({ placeholder, name, id, type, className, value, onChange }) {
   return (
      <input className={`px-4 py-3 rounded-t-md ${className}`} type={type} value={value} placeholder="placeholder" name={name} onChange={onChange} />
   )
}
