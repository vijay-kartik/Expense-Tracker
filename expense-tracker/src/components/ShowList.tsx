import { useEffect, useState } from 'react';
import IDataList from '../model/IDataList';
import { getDataFromServer } from '../services/Menu';
import AddForm from './AddForm';
import '../styles/global-style.css';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function ShowData() {
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [sum, setSum] = useState<number|null>(0);
    const [rahulTotal, setRahulTotal] = useState<number>(0);
    const [rameshTotal, setRameshTotal] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    var rahulSpent: number = 0;
    var rameshSpent: number = 0;

    useEffect(() => {
        const fetchMenu = async() => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, v) => result=result+v.price, 0)); 
                calculateShares(data);
            } catch(error: any) {
                setError(error)
            }
        }
        fetchMenu();
    });

    const calculateShares = (data : IDataList[]) => {
        data.map(record => (record.payeeName === 'Rahul' ? 
                            (rahulSpent = rahulSpent + record.price): 
                            (rameshSpent = rameshSpent + record.price)
                           )
                );
        setRahulTotal(rahulSpent);
        setRameshTotal(rameshSpent);
    }
    const closeForm = () => {setShowForm(false)}
    const success = () => {setShowForm(true)}
    return (
    <>
        <div className="main-container">
            <header id="page-header">
                <h1>Expense Tracker</h1>
            </header>
            <div className="list-container">
                <table>
                    <thead>
                        <tr>
                            <td className="table-head">Date</td>
                            <td className="table-head product">Product purchased</td>
                            <td className="table-head">Price</td>
                            <td className="table-head">Payee</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items && items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className='item-date'>{item.setDate.toString()}</td>
                                    <td className='item-product'>{item.product}</td>
                                    <td className='item-price'>{item.price}</td>
                                    <td className={item.payeeName === 'Rahul' ? 'item-rahul':'item-ramesh'}>{item.payeeName}</td>
                                </tr>
                            ) )
                        }
                    </tbody>
                </table>
                <button id="add-button" onClick={success}>Add</button>
            </div>
            {
                error && <div className="error-message">{error.message}</div>
            }
            <hr style={{width: '100%'}}/>
            <div className="calculations-container">
                
                <div style={{marginTop:'10px', marginBottom: '10px', paddingTop: '10px'}}>
                    <span className='label-total'>Total:</span>
                    <span className='item-sum'>{sum}</span>
                </div>
                <div style={{marginTop:'20px', marginBottom: '20px', paddingTop: '10px'}}>
                    <span className='label-rahulSpent'>Rahul paid:</span>
                    <span className='item-rahulTotal'>{rahulTotal}</span>
                </div>
                <div style={{marginTop:'20px', marginBottom: '20px', paddingTop: '10px'}}>
                    <span className='label-rahulSpent'>Ramesh paid:</span>
                    <span className='item-rameshTotal'>{rameshTotal}</span>
                </div>
                <div style={{marginTop:'20px', marginBottom: '10px', paddingTop: '10px'}}>
                    <span className='settlement'>Pay {rahulTotal > rameshTotal ? "Rahul": "Ramesh"}:</span>
                    <span className='settlement'>{(Math.abs(rahulTotal - rameshTotal)/2).toString()}</span>
                </div>
            </div>
        </div>
        {
                    //todo
                    showForm && 
                    (<div className="form-div">
                        <Dialog title="AddNewItem" open={showForm}>
                            <DialogTitle>Add New Form</DialogTitle>
                            <DialogContent>
                                <div style={{color: 'red'}}>Read the following instructions before proceeding:</div>
                                <div>Make sure you fill all fields where * is provided.</div>
                                <AddForm onClose={closeForm}/>
                            </DialogContent>
                        </Dialog>
                    </div>)
                }
    </>
    )
}
export default ShowData;