import React from "react";
import axios from "axios";
import Modal from "./Modal";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [clickedImg, setClicked] = useState(null);
  const [current, setCurrent] = useState(null);
  const [clickedTitle, setClickedTitle] = useState(null);

  async function getImages(callback) {
    const { data } = await axios.get(
      "https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy"
    );
    callback(data);
  }

  useEffect(() => {
    getImages(setGallery);
  }, []);
  const handleClick = (img, index) => {
    setCurrent(index);
    setClicked(img.url);
    setClickedTitle(img.name);
  };
  const rightClick = () => {
    const totalLength = gallery.length;
    if (current + 1 >= totalLength) {
      setCurrent(0);
      const newUrl = gallery[0].url;
      setClicked(newUrl);
      return;
    }
    const newIndex = current + 1;
    const newUrl = gallery.filter((item) => {
      return gallery.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].url;
    const newTitle = newUrl[0].name;
    setClickedTitle(newTitle);

    setClicked(newItem);
    setCurrent(newIndex);
  };

  const leftClick = () => {
    const totalLength = gallery.length;
    if (current === 0) {
      setCurrent(totalLength - 1);
      const newUrl = gallery[totalLength - 1].url;
      setClicked(newUrl);
      return;
    }
    const newIndex = current - 1;
    const newUrl = gallery.filter((item) => {
      return gallery.indexOf(item) === newIndex;
    });

    const newItem = newUrl[0].url;
    const newTitle = newUrl[0].name;
    setClicked(newItem);
    setCurrent(newIndex);
    setClickedTitle(newTitle);
  };

  return (
    <div>
      <section className="gallery-container">
        <div className="gallery-grid">
          {gallery.map((img, index) => (
            <div key={index}>
              <div onClick={() => handleClick(img, index)}>
                <div className="overlay">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <img src={img.url} alt="" />
              </div>
            </div>
          ))}
        </div>
      </section>
      {clickedImg && (
        <Modal
          clickedImg={clickedImg}
          setClicked={setClicked}
          rightClick={rightClick}
          leftClick={leftClick}
          current={current}
          clickedTitle={clickedTitle}
        />
      )}
    </div>
  );
}
