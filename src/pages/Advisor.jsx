import React from "react";
import { GlobalStyle } from './globalStyles';
import Hero from '../components/Hero';
import Products from '../components/Products';
import { productData, productDataTwo } from '../components/Products/data';
import Feature from '../components/Feature';
import Footer from '../components/Footer';

export default function Advisor()
{
    return(
        <div>
            <GlobalStyle />
            <Hero />
            <Products heading='Your Daily Routine' data={productData} />
            <Feature />
            <Products heading='Your Extra Food' data={productDataTwo} />
            <Footer />
        </div>
    );
}