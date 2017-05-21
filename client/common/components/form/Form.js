import React from 'react';


export default ({ onSubmit, children, className }) => (
    <form
      className={className}
      onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          onSubmit();
      }}
    >
        {children}
    </form>
)
