import { ReactElement } from "react";

interface ButonProps {
    variant: "primary" | "secondary" | "tertiary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
}

const varainStyles ={
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-300 text-purple-500",
    "tertiary": "bg-purple-500 text-white"
}

const sizeStyles = {
    "sm": "px-4 py-2 text-sm",
    "md": "px-4 py-2 text-md",
    "lg": "px-6 py-4 text-lg"
}

const defaultStyles ="rounded-md p-4 flex"


export const Button = (props: ButonProps) => {
    return(
        <button className={`${varainStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
            {props.startIcon? <div  className="pr-2">{props.startIcon}</div> : null}{props.text} {props.endIcon}</button>
    )
}