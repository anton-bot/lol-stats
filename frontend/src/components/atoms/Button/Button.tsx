import { FC, ReactNode } from "react";
import "./Button.scss";

type Props = {
    children: ReactNode;
    onClick?: () => void;
    disabled: boolean;
}

export const Button: FC<Props> = (props) => {
    const { children, onClick, disabled } = props;
    return (
        <button className="Button" onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}