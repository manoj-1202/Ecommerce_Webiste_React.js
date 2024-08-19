import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import OrderCard from "../components/pages/OrderDetails"



test('render payment component without crashing',()=>{

render(

    <BrowserRouter>
   <OrderCard/>
    
    </BrowserRouter>
)

})