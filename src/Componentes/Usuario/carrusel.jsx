import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

// Importa las imágenes correctamente desde la carpeta 'src/img'
import image1 from './src/img/1.png';
import image2 from './src/img/2.png';
import image3 from './src/img/3.png';
import image4 from './src/img/4.jpeg';

function Slider() {
  // Define las imágenes en el array 'slides'
  const slides = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 },
    // Agrega más imágenes si es necesario
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="max-w-[1368px] w-full m-auto relative group">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex]?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "440px",
          width: "100%"
        }}
        className="w-full bg-center duration-500"
      ></div>
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-10"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft />
      </div>
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-10"
        onClick={nextSlide}
      >
        <BsChevronCompactRight />
      </div>
      <div className="flex justify-center absolute bottom-4 left-0 right-0 z-10">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 mx-2 rounded-full ${
              currentIndex === slideIndex ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
