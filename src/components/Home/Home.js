import React from "react";
import { NewRelease } from "./NewRelease";
import Image from "../../../public/landing.png";
import { Link } from "@reach/router";

const Home = () => {
  return (
    <main className="hero">
      <div className="hero__container">
        <div className="hero__heading">Find your next game to play.</div>
        <div className="hero__content">
          Purchase latest console and PC games
        </div>
        <div className="">
          <Link to="/products">
            <button className="btn hero__btn">Shop Now</button>
          </Link>
        </div>
      </div>
      <div className="hero">
        <div className="hero__img__wrapper">
          <img src={Image} alt="Landimg Image" className="hero__img" />
        </div>
      </div>
    </main>
  );
};

export default Home;
