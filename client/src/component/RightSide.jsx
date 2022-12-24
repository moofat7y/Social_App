import React from "react";
import { useSelector } from "react-redux";
import Suggest from "./Suggest";

const RightSide = () => {
  const { Suggistion } = useSelector((state) => state);

  const renderedSugestions = Suggistion?.map((sug, index) => {
    return <Suggest user={sug} key={index} />;
  });
  return (
    <div className="friend-req col-5 d-none d-xl-flex  px-0 col-lg-4 pt-3 ">
      <div className="requsts w-100 sticky-top">
        {Suggistion.length > 0 ? (
          <>
            <span className="text-info mb-3 d-block fw-bold">
              Suggestions for you
            </span>
            {renderedSugestions}
          </>
        ) : (
          <span className="text-info mb-3 d-block fw-bold">
            There is no suggestions for you
          </span>
        )}
      </div>
    </div>
  );
};

export default RightSide;
