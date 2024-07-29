import React, { ReactNode } from "react";

interface Alert {
  children: ReactNode;
}

function Alert({ children }: Alert) {
  return <div className="alert alert-primary">{children}</div>;
}

export default Alert;
