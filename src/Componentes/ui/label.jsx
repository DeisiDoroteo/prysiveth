import React from 'react'



function Label({ children, ...props }) {
  return (
    <label className="flex font-medium leading-6 text-gray-900" {...props}>
      {children}
    </label>
  );
}

export default Label;
