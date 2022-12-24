import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
const ModalControl = (props) => {
  const [activeFont, setActiveFont] = useState(
    JSON.parse(window.localStorage.getItem("font-size") || 15)
  );
  const [activeColor, setActiveColor] = useState(
    JSON.parse(window.localStorage.getItem("color") || 0)
  );
  const [activeTheme, setActiveTheme] = useState(
    JSON.parse(window.localStorage.getItem("theme")) || 0
  );
  const colorsHsl = [
    ["bg-default", "hsl(252, 75%, 60%)"],
    ["bg-warning", "hsl(52, 75%, 60%)"],
    ["bg-danger", "hsl(352, 75%, 60%)"],
    ["bg-success", "hsl(152, 75%, 60%)"],
    ["bg-blue", "hsl(202, 75%, 60%)"],
  ];
  const colorsRgba = [
    ["bg-default", "107, 76, 230"],
    ["bg-warning", "230, 209, 76"],
    ["bg-danger", "230, 76, 97"],
    ["bg-success", "76, 230, 158"],
    ["bg-blue", "76, 173, 230"],
  ];
  const themes = [
    {
      themename: "Light",
      "bg-white": "255,255,255",
      "bg-light": "240,238,246",
      "bg-dark": "157.7175, 152.3625, 179.1375",
      "active-link": "#f0eef6",
      "text-color": "rgb(21,18,33)",
    },
    {
      themename: "Dim",
      "bg-light": "20,20,20",
      "bg-white": "40,40,40",
      "bg-dark": "157.7175, 152.3625, 179.1375",
      "active-link": "#141414",
      "text-color": "rgb(240,238,246)",
    },
    {
      themename: "Dark",
      "bg-light": "0,0,0",
      "bg-white": "20,20,20",
      "bg-dark": "157.7175, 152.3625, 179.1375",
      "active-link": "#000000",
      "text-color": "rgb(240,238,246)",
    },
  ];
  const handleFontSize = (fontSize) => {
    setActiveFont(fontSize);
    window.localStorage.setItem("font-size", JSON.stringify(fontSize));
    document.documentElement.style.setProperty("font-size", fontSize);
  };
  const handleColor = (index) => {
    document.documentElement.style.setProperty(
      "--bs-primary-rgb",
      colorsRgba[index][1]
    );

    document.documentElement.style.setProperty(
      "--bs-primary",
      colorsHsl[index][1]
    );

    window.localStorage.setItem("color", JSON.stringify(index));
  };
  const handleTheme = (index) => {
    document.documentElement.style.setProperty(
      "--bs-light-rgb",
      themes[index]["bg-light"]
    );

    document.documentElement.style.setProperty(
      "--bs-white-rgb",
      themes[index]["bg-white"]
    );

    document.documentElement.style.setProperty(
      "--bs-black",
      themes[index]["text-color"]
    );

    document.documentElement.style.setProperty(
      "--bs-black-rgb",
      themes[index]["text-color"]
    );

    document.documentElement.style.setProperty(
      "--bs-dark-rgb",
      themes[index]["bg-dark"]
    );

    document.documentElement.style.setProperty(
      "--bs-light",
      themes[index]["active-link"]
    );
    window.localStorage.setItem("theme", JSON.stringify(index));
  };
  useEffect(() => {
    const currentFont = JSON.parse(window.localStorage.getItem("font-size"));
    const theme = JSON.parse(window.localStorage.getItem("theme")) || 0;
    handleFontSize(currentFont);
    setActiveTheme(theme);
  }, []);
  useEffect(() => {
    handleColor(activeColor);
  }, [activeColor]);

  useEffect(() => {
    handleTheme(activeTheme);
  }, [activeTheme]);
  useEffect(() => {
    handleFontSize(
      typeof activeFont === "number" ? `${activeFont}px` : activeFont
    );
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-4 p-sm-5 rounded-4 bg-white text-center">
        <div className="header">
          <h4 className="mb-1">Customize your view</h4>
          <p className="text-info">
            Mange your font size, color, and background
          </p>
        </div>

        <div className="font-size mt-5">
          <span className="fw-bold d-block mb-2">Font Size</span>
          <div className="customize bg-light px-3 py-2 rounded-4 d-flex align-items-center">
            <span className="fs-8 fw-bold ">Aa</span>
            <div className="bar position-relative mx-4 w-100 d-flex justify-content-between align-items-center">
              <span
                data-font-size="13px"
                onClick={(e) =>
                  handleFontSize(e.currentTarget.dataset.fontSize)
                }
                className={`p-2 rounded-circle bg-secondary d-block ${
                  activeFont === "13px" ? "active" : ""
                }`}
              ></span>
              <span
                data-font-size="14px"
                onClick={(e) =>
                  handleFontSize(e.currentTarget.dataset.fontSize)
                }
                className={`p-2 rounded-circle bg-secondary d-block ${
                  activeFont === "14px" ? "active" : ""
                }`}
              ></span>
              <span
                data-font-size="15px"
                onClick={(e) =>
                  handleFontSize(e.currentTarget.dataset.fontSize)
                }
                className={`p-2 rounded-circle bg-secondary d-block ${
                  activeFont === "15px" ? "active" : ""
                }`}
              ></span>
              <span
                data-font-size="16px"
                onClick={(e) =>
                  handleFontSize(e.currentTarget.dataset.fontSize)
                }
                className={`p-2 rounded-circle bg-secondary d-block ${
                  activeFont === "16px" ? "active" : ""
                }`}
              ></span>
              <span
                data-font-size="17px"
                onClick={(e) =>
                  handleFontSize(e.currentTarget.dataset.fontSize)
                }
                className={`p-2 rounded-circle bg-secondary d-block ${
                  activeFont === "17px" ? "active" : ""
                }`}
              ></span>
            </div>
            <span className="fs-6 fw-bold">Aa</span>
          </div>
        </div>

        <div className="customize-color mt-5">
          <span className="fw-bold d-block mb-2">Color</span>
          <div className="customize rounded-4 d-flex justify-content-between align-items-center bg-light px-3 py-2">
            {colorsHsl.map((color, index) => {
              return (
                <span
                  key={index}
                  onClick={() => setActiveColor(index)}
                  className={`${color[0]} ${
                    activeColor === index ? "active" : ""
                  } p-3 rounded-circle d-block`}
                ></span>
              );
            })}
          </div>
        </div>

        <div className="theme mt-4">
          <span className="d-block mb-2">Background</span>
          <div className="customize row justify-content-between">
            {themes.map((theme, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setActiveTheme(index)}
                  className={`py-3 px-2 rounded-3 col-5 fs-7 col-md-5 ${
                    theme.themename
                  } ${activeTheme === index ? "active" : ""}`}
                >
                  {theme.themename}
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalControl;
