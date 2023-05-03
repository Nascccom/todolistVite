import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";

type SuperCheckBoxType = {
    callBack: (checked: boolean) => void
    checked: boolean
}

export const SuperCheckBox = memo((props: SuperCheckBoxType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.callBack(e.currentTarget.checked)

    return <Checkbox checked={props.checked}
                     onChange={onChangeHandler}
                     color="success"/>
});
