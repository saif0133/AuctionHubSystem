import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  icon: IconDefinition;
  onClick2: (input: string) => void;
}

function Button({ icon, onClick2 }: ButtonProps) {
  return (
    <button className="search-button" onClick={() => onClick2("")}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default Button;
