import { render } from "@testing-library/react"
import Footer from "../components/Footer"
import { BrowserRouter } from "react-router-dom"

test('render banner component without crashing',()=>{

render(
    <BrowserRouter>
<Footer/>
</BrowserRouter>

)

})