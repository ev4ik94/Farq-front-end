import MaskedInput from 'react-maskedinput'


export const MaskInput = ({field, form, ...props})=>{
    return (
        <MaskedInput mask="+998 (11) 111-11-11"
                     name="phone"
                     size="20"
                     {...props}
        />
    )
}