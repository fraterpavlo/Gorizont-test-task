import {useRouter} from "next/router";
import styles from '../../styles/user.module.scss'
import MainContainer from "../../components/MainContainer";

export default function Product({product}) {
    const {query} = useRouter()
    return (
        <MainContainer>
            <div className={styles.product}>
                <h1>Товар c id {query.id}</h1>
                <div>Название товара - {product.title}</div>
            </div>
        </MainContainer>
    )
};

export async function getServerSideProps({params}) {
    const response = await fetch(`https://649b5496bf7c145d023a3abb.mockapi.io/cards/${params.id}`)
    const product = await response.json()
    return {
        props: {product}, 
    }
}
