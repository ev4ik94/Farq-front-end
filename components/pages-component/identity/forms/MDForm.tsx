import { MDBInput } from "mdbreact"


export const MDForm = ({field, name, label, form, ...props})=>{
    return (
        <MDBInput label={label}
                     name="phone"
                     {...props}
        />
    )
}