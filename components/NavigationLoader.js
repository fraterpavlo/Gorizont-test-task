import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavigationLoader(props) {
  const { text = "Loading..." } = props;
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);

  if (!isLoading) return null;

  return (
    <>
      <div className="navigation-loader">{text}</div>
      <style jsx>
        {`
          .navigation-loader {
            z-index: 1;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0006;
            color: #fff;
            font-size: 18px;
            font-weight: 700;
          }
        `}
      </style>
    </>
  );
}
