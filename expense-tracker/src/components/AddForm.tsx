import { ChangeEvent, FormEvent, useState } from "react";
import { postDataToServer } from "../services/Menu";
import FormElement from "./FormElement";

type Props = {
    onClose : any
}

const AddForm = ( props : Props) => {
    const [payeeName, setPayeeName] = useState<string>('');
    const [product, setProduct] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [date, setDate] = useState<string>('');

    const setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
        setPayeeName(event.target.value)
    }
    
    const setProductF = (event: ChangeEvent<HTMLInputElement>) => {
        setProduct(event.target.value)
    }

    const setPriceF = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(event.target.value))
    }

    const setDateF = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }

    const submitHandler = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const finalData = {
            payeeName: payeeName,
            product: product,
            price: price,
            setDate: date
        }
        try {
            const data = await postDataToServer(finalData);
            console.log("data submitted", data);
        } catch (error: any) {
            console.log(error.message);
        }
        props.onClose()
    }

    return (
        <div>
            <form action="submit" onSubmit={submitHandler}>
                <FormElement 
                    label="Name" 
                    inputElement=
                        {
                            <select className = 'item-input' name="select" id="payeeName" required 
                                    value = { payeeName } onChange = { setPayee }>
                                <option value="Choose" defaultChecked>Choose</option>
                                <option value="Rahul">Rahul</option>
                                <option value="Ramesh">Ramesh</option>
                            </select>
                        } 
                />
                <FormElement label="Product purchased" 
                    inputElement = { <input className = 'item-input' type = "text" value = { product } onChange={ setProductF } /> } />
                <FormElement label="Price" 
                    inputElement={<input className = 'item-input' type = "number" value = { price } onChange={ setPriceF } /> } />
                <FormElement label="Date" 
                    inputElement={<input className = 'item-input' type = "date" value = {date} onChange = { setDateF } /> } />
                <button type = "submit" id = "submit" className = "btn"> Submit </button>
                <button id="close" onClick = { props.onClose } className = "btn"> Close </button>
            </form>
        </div>
    )
}

export default AddForm;