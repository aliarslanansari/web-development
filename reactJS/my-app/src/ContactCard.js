import React from "react";

 function ContactCard(props){
     console.log(props);
     return (
         <div classNameName="card" style={{width: "18rem"}}>
         <img src={props.contact.imgUrl} className="card-img-top" />
         <div className="card-body">
           <h5 className="card-title">{props.contact.name}</h5>
           <p className="card-text">
            <p>Phone: {props.contact.phone}</p>
            <p>Email: {props.contact.email}</p>
           </p>
         </div>
       </div>
     );
 }

 export default ContactCard;