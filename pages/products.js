import {useState, useEffect} from 'react'
import Link from "next/link";
import MainContainer from "../components/MainContainer";

const Products = ({product}) => {
    return (
        <MainContainer>
            <h1>Cписок товаров</h1>
            <ul>
                {product.map(product =>
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}>
                            {product.title}
                        </Link>
                    </li>
                )}
            </ul>
        </MainContainer>
    );
};

export default Products;

export async function getStaticProps(context) {
    const response = await fetch(`https://649b5496bf7c145d023a3abb.mockapi.io/cards`)
    const products = await response.json()

    return {
        props: {
            product: products,
        }, 
        revalidate: 2,
    }
}
