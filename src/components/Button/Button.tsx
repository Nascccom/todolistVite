import React, {memo, useCallback} from 'react';
import {Button} from '@mui/material';


type ButtonType = {
    buttonName: string
    callBack: () => void
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    size?: "small" | "medium" | "large"
    variant?: "text" | "outlined" | "contained"
    startIcon?: React.ReactNode
    style?: object
}

export const ButtonComponent = memo((props: ButtonType) => {
    const clickButtonHandler = useCallback(() => {
        props.callBack()
    }, [props.callBack])

    return (
      <Button onClick={clickButtonHandler}
              color={props.color}
              size={props.size}
              variant={props.variant}
              style={props.style}
              sx={{'css-1koxnt2-MuiButtonGroup-root': {border: 'none'}}}
              startIcon={props.startIcon}
      >
          {props.buttonName}
      </Button>
    );
});

