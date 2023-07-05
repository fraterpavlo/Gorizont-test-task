import A from "./A";
import Head from "next/head";

const MainContainer = ({children}) => {
    return (
        <>
            <Head>
                <title>Главная страница</title>
            </Head>
            <div className="navbar">
                <A href={'/'} text="Главная"/>
                <A href={'/products'} text="Товары"/>
            </div>
            <div>
                {children}
            </div>
            <style jsx>
                {`
                    .navbar {
                        background: orange;
                        padding: 15px;
                    }
                   
                `}
            </style>
        </>
    );
};

export default MainContainer;
