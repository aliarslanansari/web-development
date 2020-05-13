import React from "react";

 function ProductCard(props){
     console.log(props);
     return (
       <div className="col-md-3 p-1 m-1 justify-content-around">
          <div className="card" style={{width: "18rem"}}>
         <div className="card-body">
           <h5 className="card-title">{props.product.name}</h5>
           <p className="card-text">
           Phone: {props.product.price} 1
           Email: {props.product.description}
           </p>
         </div>
       </div>
       </div>
     );
 }

 export default ProductCard;