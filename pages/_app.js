import '../styles/globals.css'
import '../componenets/Navbar/Navbar'
// import Navbar from '../componenets/Navbar/Navbar';
import { Navbar, Footer } from "../componenets/componentIndex";
import {NFTMarketplaceProvider} from '../Context/NFTMarketplaceContext'
const MyApp = ({ Component, pageProps }) => (

    <div>
        <NFTMarketplaceProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        </NFTMarketplaceProvider>
    </div>
    
); 
  


export default MyApp;
