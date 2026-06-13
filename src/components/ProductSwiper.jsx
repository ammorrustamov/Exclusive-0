import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function ProductSwiper() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/swiper");
        const data = await response.json();

        console.log(data);

        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Ma'lumot olishda xato:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Yuklanmoqda... 🐾
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Rasmlar topilmadi.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        height: "500px",
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={images.length > 1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide
            key={item.id || index}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                background: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Xiralashtirilgan fon */}
              <img
                src={item.image || item.url}
                alt=""
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(20px)",
                  transform: "scale(1.1)",
                  opacity: 0.4,
                  zIndex: 1,
                }}
              />

              {/* Asosiy rasm */}
              <img
                src={item.image || item.url}
                alt={item.title || "Banner"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 2,
                }}
              />

              {item.title && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: "20px",
                    color: "#fff",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    zIndex: 3,
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {item.title}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
          background: #ff3b30 !important;
          width: 20px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
}