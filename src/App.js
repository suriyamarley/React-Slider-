import React, { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/normalize.css";
import data from "./data";
import { AiOutlineIdcard } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight, FaQuoteRight } from "react-icons/fa";

const App = () => {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 10000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  useEffect(() => {
    if (index > people.length - 1) {
      setIndex(0);
    }

    if (index < 0) {
      setIndex(people.length - 1);
    }
  }, [index, people.length]);

  return (
    <div className="main">
      <div className="title">
        <h1>
          Profile Card
        </h1>
      </div>

      <div className="main-card">
        {people.map((person, personindex) => {
          const { id, name, occupation, image, description } = person;
          let position = "nextslide";

          if (personindex === index) {
            position = "activeslide";
          }

          if (
            personindex === index - 1 ||
            (index === 0 && personindex === people.length - 1)
          ) {
            position = "lastslide";
          }
          return (
            <article className={position} key={id}>
              <div className="img-container">
                <img src={image} alt={name} />
              </div>
              <h3>{name}</h3>
              <div className="btn-container">
                <button type="button" onClick={() => setIndex(index - 1)}>
                  <FaAngleLeft />
                </button>
                <button type="button" onClick={() => setIndex(index + 1)}>
                  <FaAngleRight />
                </button>
              </div>
              <div className="content">
                <div className="job">
                  <p>{occupation}</p>
                </div>
                <p className="desc">{description}</p>
                <div className="quote-icon">
                  <FaQuoteRight />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default App;
