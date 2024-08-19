import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import PaymentOptions from "../components/pages/Payment"


test('render payment component without crashing',()=>{

render(

    <BrowserRouter>
    <PaymentOptions/>
    
    </BrowserRouter>
)

})