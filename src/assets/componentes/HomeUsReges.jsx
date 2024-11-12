import  Carousel from '../../Componentes/Usuario/carrusel.jsx'
import  BlogSection from '../../Componentes/ui/blog.jsx'
import HeaderUsReg from './HeaderUsReg.jsx';
import 'tailwindcss/tailwind.css';
function Home() {
    
    return (
        <main>
        <HeaderUsReg/>

<Carousel/>

<BlogSection/>
        </main>

           
 
    )
}
export default Home