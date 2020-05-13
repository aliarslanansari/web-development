import React from "react"
import Footer from "./Footer"
import Main from "./Main"
import Header from "./Header"
import ContactCard from "./ContactCard"

function App(){
    return(
        <div>
            <Header />
            <ContactCard 
            contact={{
                name:"Mr. Wisker", 
                imgUrl: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd29345c7_340.jpg",
                phone:"83757321234",
                email:"xyz@gjg.com"
            }}
            />
             <ContactCard 
            contact={{
                name:"Mr. Wisker", 
                imgUrl: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd29345c7_340.jpg",
                phone:"83757321234",
                email:"xyz@gjg.com"
            }}
            />
             <ContactCard 
            contact={{
                name:"Mr. Wisker", 
                imgUrl: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd29345c7_340.jpg",
                phone:"83757321234",
                email:"xyz@gjg.com"
            }}
            />
             <ContactCard 
            contact={{
                name:"Mr. Wisker", 
                imgUrl: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd29345c7_340.jpg",
                phone:"83757321234",
                email:"xyz@gjg.com"
            }}
            />
             <ContactCard 
            contact={{
                name:"Mr. Wisker", 
                imgUrl: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd29345c7_340.jpg",
                phone:"83757321234",
                email:"xyz@gjg.com"
            }}
            />
             <ContactCard 
            contact={{
                name:"Mr. Wisker", 
                imgUrl: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd29345c7_340.jpg",
                phone:"83757321234",
                email:"xyz@gjg.com"
            }}
            />
            <Footer />        
        </div>
   )
}

export default App;