import '../styles/form-element.css';
import { ReactNode } from 'react'

type Props = {
    label: String,
    inputElement: ReactNode
}

const FormElement = (props: Props) => {
    return (
        <div className="item-container">
            <div className='item-label'>{props.label}<span style={{color: 'red'}}>*</span></div>
            <br/>
            { props.inputElement }
        </div>
    )
}

export default FormElement