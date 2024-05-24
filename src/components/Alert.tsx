import React, { ReactNode } from 'react';

interface AlertProps {
  onClickedOn: () => void;
  children: ReactNode;
}

function Alert({ onClickedOn, children }: AlertProps) {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClickedOn}
      />
    </div>
  );
}

export default Alert;
