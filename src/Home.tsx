import { NavLink } from "react-router-dom";
import ProductCard from "./components/ProductCard";

const image =
  "https://cdn.motor1.com/images/mgl/MkO9NN/s2/future-supercars.webp";
const title = "Test";
const des =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a libero quis tellus ultricies elementum. Suspendisse aliquet nisi quis diam sagittis semper.";
const price = 1000;
const endDate = new Date("2024-06-27T00:00:00");
const pId = 1;

const Home = () => {
  return (
    <div className="testmain">
      <div className="products">
        <ProductCard
          img={image}
          title={title}
          description={des}
          currentPrice={price}
          endDate={endDate}
          id={pId}
          message={""}
        ></ProductCard>

        <ProductCard
          img={image}
          title={title}
          description={des}
          currentPrice={price}
          endDate={endDate}
          id={pId}
          message={""}
        ></ProductCard>
        <ProductCard
          img={image}
          title={title}
          description={des}
          currentPrice={price}
          endDate={endDate}
          id={pId}
          message={""}
        ></ProductCard>
        <ProductCard
          img={image}
          title={title}
          description={des}
          currentPrice={price}
          endDate={endDate}
          id={pId}
          message={""}
        ></ProductCard>
        <ProductCard
          img={image}
          title={title}
          description={des}
          currentPrice={price}
          endDate={endDate}
          id={pId}
          message={""}
        ></ProductCard>

        <ProductCard
          img={image}
          title={title}
          description={des}
          currentPrice={price}
          endDate={endDate}
          id={pId}
          message={""}
        ></ProductCard>

        <ProductCard
          img={image}
          title={title}
          description={des}
          currentPrice={price}
          endDate={endDate}
          id={pId}
          message={""}
        ></ProductCard>
      </div>
      <NavLink to="/all" className={"btn-secondary btn"}>
        Next
      </NavLink>
    </div>
  );
};

export default Home;
