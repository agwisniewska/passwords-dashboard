import { ReactNode } from 'react';

import classes from './LabelledIconButton.module.css';
import Button, { ButtonProps } from '../../atoms/button/Button';
import clsx from 'clsx';

type LabelledIconButtonProps = ButtonProps & {
    label: string;
    icon: ReactNode;
    className?: string;
}

function LabelledIconButton({ label, icon, className, ...rest }: LabelledIconButtonProps) {
    return (
        <Button className={clsx(classes.container, className)} {...rest}>
            <span className={classes.icon}>{icon}</span>
            {label}
        </Button>
    );
}

export default LabelledIconButton;
