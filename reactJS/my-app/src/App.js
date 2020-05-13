import React from "react"
// import Footer from "./Footer"
// //  import Main from "./Main"
// import Header from "./Header"
import ProductData from "./vschoolProducts"
import Product from "./Product"
// import ContactCard from "./ContactCard"

function App(){

    const ProductComponent = ProductData.map(item => <Product key={item.id} product={item}  /> );
    return(
        <div className="container">
            <div className="row">
                {ProductComponent}            
            </div>
        </div>
   )
}

export default App;