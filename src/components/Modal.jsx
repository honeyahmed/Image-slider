const Modal = ({
  clickedImg,
  setClicked,
  rightClick,
  current,
  leftClick,
  clickedTitle,
}) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("close")) {
      setClicked(null);
    }
  };
  document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowRight") {
      rightClick();
    } else if (e.code === "ArrowLeft") {
      leftClick();
    } else if (e.code === "Escape") {
      setClicked(null);
    }
  });

  return (
    <>
      <div className="modal close" onClick={handleClick}>
        <div className="sliderContent">
          <img src={clickedImg} alt="" />

          <i className="fa-solid fa-x close" onClick={handleClick}></i>
          <i
            className="fa-solid fa-angle-left leftArrow"
            onClick={leftClick}
          ></i>
          <i
            className="fa-solid fa-angle-right rightArrow "
            onClick={rightClick}
          ></i>
          <div className="imgTitle">
            <p>{clickedTitle}</p>
          </div>
          <span>{current + 1}/30</span>
        </div>
      </div>
    </>
  );
};
export default Modal;
