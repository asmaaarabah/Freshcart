import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Home() {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setisLoading(false), 3000);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <CategorySlider />
          <FeaturedProducts />
        </>
      )}
    </>
  );
}
