import React from "react";

 function ContactCard(props){
     console.log(props);
     return (
         <div className="card" style={{width: "18rem"}}>
         <img src={props.contact.imgUrl} className="card-img-top" alt="asd"/>
         <div className="card-body">
           <h5 className="card-title">{props.contact.name}</h5>
           <p className="card-text">
           Phone: {props.contact.phone} 1
           Email: {props.contact.email}
           </p>
         </div>
       </div>
     );
 }

 export default ContactCard;