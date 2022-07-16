import AddForm from "./AddForm";

export default function ShowForm() {

    const refreshForm = () => {
        console.log("Do nothing");
    }
    return (
            <>
                <div>Add New Item</div>
                <AddForm onClose={refreshForm} /> 
            </>
        );
} 