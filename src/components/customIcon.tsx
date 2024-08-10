import * as React from "react";

const CustomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 50 40.86"
    height={props.height || "16px"}
    width={props.width || "16px"}
    fill="currentColor"
    {...props}
  >
    <polygon points="25,0 50,0 37.5,20.44 25,40.88 12.5,20.44 0,0" />
  </svg>
);

export default CustomIcon;
