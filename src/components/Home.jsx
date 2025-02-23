import React, { useEffect, useState } from "react";
import {
  Diamond,
  Globe,
  Shield,
  Award,
  Factory,
  Ship,
  Building,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Navbar from "./Navbar";
import Asscher from "../assets/Shapes/Asscher.svg";
import Cushion from "../assets/Shapes/Cushion.svg";
import Emerald from "../assets/Shapes/Emerald.svg";
import Heart from "../assets/Shapes/Heart.svg";
import Marquise from "../assets/Shapes/Marquise.svg";
import Oval from "../assets/Shapes/Oval.svg";
import Pear from "../assets/Shapes/Pear.svg";
import Princess from "../assets/Shapes/Princess.svg";
import Radiant from "../assets/Shapes/Radiant.svg";
import Round from "../assets/Shapes/Round.svg";
import { Link } from "react-router-dom";
import GIALogo from "../assets/GIA Logo.png";
import IGILogo from "../assets/IGI Logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const FloatingShapes = () => {
  const SPEED_MULTIPLIER = 0.3;
  const WALL_SPEED_BOOST = 1.3; // Speed increase factor on wall collision
  const MAX_SPEED = 2; // Maximum allowed speed
  
  const shapes = [
    Asscher,
    Cushion,
    Emerald,
    Heart,
    Marquise,
    Oval,
    Pear,
    Princess,
    Radiant,
    Round,
  ];

  const totalShapes = Math.floor(Math.random() * 16) + 15;
  
  const initialShapes = Array.from({ length: totalShapes }, () => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.floor(Math.random() * 49) + 32;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const rotation = Math.random() * 360;
    
    return {
      shape: randomShape,
      size,
      left,
      top,
      rotation,
      velocityX: (Math.random() - 0.5) * SPEED_MULTIPLIER,
      velocityY: (Math.random() - 0.5) * SPEED_MULTIPLIER,
      angularVelocity: 0,
    };
  });

  const [animatedShapes, setAnimatedShapes] = useState(initialShapes);

  const pixelsToPercent = (pixels) => pixels / window.innerWidth * 100;

  const checkCollision = (shape1, shape2) => {
    const size1Percent = pixelsToPercent(shape1.size);
    const size2Percent = pixelsToPercent(shape2.size);
    
    const center1 = {
      x: shape1.left + size1Percent / 2,
      y: shape1.top + size1Percent / 2
    };
    
    const center2 = {
      x: shape2.left + size2Percent / 2,
      y: shape2.top + size2Percent / 2
    };

    const dx = center1.x - center2.x;
    const dy = center1.y - center2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (size1Percent + size2Percent) / 2;

    return distance < minDistance;
  };

  const handleCollision = (shape1, shape2) => {
    const size1Percent = pixelsToPercent(shape1.size);
    const size2Percent = pixelsToPercent(shape2.size);

    const center1 = {
      x: shape1.left + size1Percent / 2,
      y: shape1.top + size1Percent / 2
    };
    
    const center2 = {
      x: shape2.left + size2Percent / 2,
      y: shape2.top + size2Percent / 2
    };

    const dx = center2.x - center1.x;
    const dy = center2.y - center1.y;
    const angle = Math.atan2(dy, dx);
    const normal = { x: Math.cos(angle), y: Math.sin(angle) };
    
    const v1 = Math.sqrt(shape1.velocityX * shape1.velocityX + shape1.velocityY * shape1.velocityY);
    const v2 = Math.sqrt(shape2.velocityX * shape2.velocityX + shape2.velocityY * shape2.velocityY);
    
    const overlap = (size1Percent + size2Percent) / 2 - Math.sqrt(dx * dx + dy * dy);
    if (overlap > 0) {
      const pushX = (overlap / 2) * Math.cos(angle);
      const pushY = (overlap / 2) * Math.sin(angle);
      
      const newShape1 = {
        ...shape1,
        left: shape1.left - pushX,
        top: shape1.top - pushY,
        velocityX: -normal.x * v2 * 0.8,
        velocityY: -normal.y * v2 * 0.8,
        angularVelocity: (Math.random() - 0.5) * 10,
      };
      
      const newShape2 = {
        ...shape2,
        left: shape2.left + pushX,
        top: shape2.top + pushY,
        velocityX: normal.x * v1 * 0.8,
        velocityY: normal.y * v1 * 0.8,
        angularVelocity: (Math.random() - 0.5) * 10,
      };
      
      return [newShape1, newShape2];
    }
    
    return [shape1, shape2];
  };

  // Helper function to limit speed
  const clampSpeed = (velocity) => {
    const speed = Math.abs(velocity);
    if (speed > MAX_SPEED) {
      return (velocity / speed) * MAX_SPEED;
    }
    return velocity;
  };

  useEffect(() => {
    const updateFrame = () => {
      setAnimatedShapes(prevShapes => {
        const newShapes = [...prevShapes];
        
        for (let i = 0; i < newShapes.length; i++) {
          for (let j = i + 1; j < newShapes.length; j++) {
            if (checkCollision(newShapes[i], newShapes[j])) {
              const [newShape1, newShape2] = handleCollision(newShapes[i], newShapes[j]);
              newShapes[i] = newShape1;
              newShapes[j] = newShape2;
            }
          }
        }
        
        return newShapes.map(shape => {
          const sizePercent = pixelsToPercent(shape.size);
          let newLeft = shape.left + shape.velocityX;
          let newTop = shape.top + shape.velocityY;
          let newVelocityX = shape.velocityX;
          let newVelocityY = shape.velocityY;
          let newRotation = (shape.rotation + shape.angularVelocity) % 360;
          let newAngularVelocity = shape.angularVelocity * 0.95;

          // Bounce off walls with speed boost
          if (newLeft <= 0 || newLeft >= (100 - sizePercent)) {
            newVelocityX = -newVelocityX * WALL_SPEED_BOOST; // Increase speed on wall collision
            newVelocityX = clampSpeed(newVelocityX); // Limit maximum speed
            newLeft = Math.max(0, Math.min(100 - sizePercent, newLeft));
            newAngularVelocity = (Math.random() - 0.5) * 10;
          }
          
          if (newTop <= 0 || newTop >= (100 - sizePercent)) {
            newVelocityY = -newVelocityY * WALL_SPEED_BOOST; // Increase speed on wall collision
            newVelocityY = clampSpeed(newVelocityY); // Limit maximum speed
            newTop = Math.max(0, Math.min(100 - sizePercent, newTop));
            newAngularVelocity = (Math.random() - 0.5) * 10;
          }

          return {
            ...shape,
            left: newLeft,
            top: newTop,
            rotation: newRotation,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
            angularVelocity: newAngularVelocity,
          };
        });
      });
    };

    const animationInterval = setInterval(updateFrame, 16);
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {animatedShapes.map((item, index) => (
        <div
          key={`${item.shape}-${index}`}
          className="absolute transition-all duration-[16ms] ease-linear"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          <img
            src={item.shape}
            alt="Diamond shape"
            className="transition-transform"
            style={{
              width: `${item.size}px`,
              height: `${item.size}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
};


export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      // once: true, // Animation triggers only once
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-theme-50">
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(50px, 50px) rotate(90deg);
          }
          50% {
            transform: translate(0, 100px) rotate(180deg);
          }
          75% {
            transform: translate(-50px, 50px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }

        .animate-float {
          animation: float 20s infinite linear;
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 mx-auto overflow-hidden max-w-[90%]">
        {mounted && <FloatingShapes />}
        <div className="relative grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="z-10">
            <h1
              data-aos="fade-up"
              className="text-4xl font-bold tracking-tight text-theme-950 md:text-5xl"
            >
              Certified Diamonds
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="500"
              className="mt-6 text-lg text-theme-700"
            >
              Global leaders in manufacturing and trading certified diamonds.
              Delivering excellence through precision, quality, and trust.
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link
                to={"/dashboard"}
                className="px-6 py-3 text-white rounded-lg bg-theme-950 hover:bg-theme-600 transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Specialties */}
      <section className="px-6 py-12 bg-theme-950 text-white">
        <div className="mx-auto max-w-[90%]">
          <div
            data-aos-delay="500"
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                icon: <Building className="w-6 h-6" />,
                title: "Importer",
                description: "Direct sourcing from premium suppliers",
              },
              {
                icon: <Ship className="w-6 h-6" />,
                title: "Exporter",
                description: "Global diamond distribution network",
              },
              {
                icon: <Factory className="w-6 h-6" />,
                title: "Manufacturer",
                description: "State-of-the-art diamond manufacturing facility",
              },
            ].map((specialty, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 1000}
                key={index}
                className="shadow-2xl p-6 text-center rounded-2xl bg-theme-800"
              >
                <div className="flex items-center justify-center mb-4">
                  {specialty.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {specialty.title}
                </h3>
                <p className="text-theme-100">{specialty.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-[90%]">
          <div className="text-center gap-12 lg:grid-cols-2">
            <div>
              <h2
                data-aos="fade-up"
                className="mb-6 text-3xl font-bold text-theme-950"
              >
                About Us
              </h2>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="space-y-4 text-theme-700"
              >
                <p>
                  Khodal Gems, more than 35 year old company having extensive,
                  expertise and experience in Diamonds Industry. One of the
                  largest purchasers of diamonds and known around the world for
                  our ethical standards, we are the direct source for fresh cut,
                  excellent cut diamonds 10 carat and under.
                </p>
                <p>
                  We deal only conflict free, natural polished diamonds from
                  only the most reputable sight holder companies and regularly
                  test our supply chain – more important now than ever before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-theme-50">
        <div className="mx-auto max-w-[90%]">
          <h2
            data-aos="fade-up"
            className="mb-12 text-3xl font-bold text-center text-theme-950"
          >
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Diamond className="w-8 h-8" />,
                title: "Premium Quality",
                description:
                  "Certified diamonds meeting the highest international standards",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Network",
                description: "Expert import and export services worldwide",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Certified Authority",
                description:
                  "Fully certified and compliant with industry regulations",
              },
            ].map((feature, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 500}
                key={index}
                className="shadow-xl p-6 transition-all bg-white rounded-2xl"
              >
                <div className="p-3 mb-4 rounded-full w-fit bg-theme-50 text-theme-950">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-theme-950">
                  {feature.title}
                </h3>
                <p className="text-theme-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-theme-950">
        <div className="mx-auto max-w-[90%]">
          <div className="p-12 text-center">
            <Award
              data-aos="fade-up"
              className="mx-auto mb-6 text-white w-14 h-14"
            />
            <h2
              data-aos="fade-up"
              className="mb-4 text-3xl font-bold text-white"
            >
              Ready to Experience Excellence?
            </h2>
            <p data-aos="fade-up" className="mb-8 text-theme-100">
              Join our network of satisfied clients worldwide
            </p>
            <Link
              to={"/contact"}
              data-aos="fade-up"
              data-aos-delay="1000"
              className="px-8 py-3 text-theme-950 bg-white rounded-lg hover:bg-theme-50 transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-theme-50 border-t border-theme-50">
        <div className="px-6 py-12 mx-auto max-w-[90%]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* About Column */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-theme-950">
                About Us
              </h3>
              <p className="text-sm text-theme-600">
                Khodal Gems is a leading manufacturer and trader of certified
                diamonds, committed to delivering excellence through precision,
                quality, and trust for over 10 years.
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-theme-950">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  ["Home", "/"],
                  ["Contact", "/contact"],
                ].map(([title, url]) => (
                  <li key={title}>
                    <Link
                      to={url}
                      className="text-sm text-theme-600 hover:text-theme-950 transition-colors"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-theme-950">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm text-theme-600">
                  <MapPin className="w-14 h-14 text-theme-950" />
                  <span>
                    A-101, Kamla Estate Savani Road, Mini Bazar, Varachha,
                    Kodiyar Nagar, Surat, Gujarat 395006, India
                  </span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-theme-600">
                  <a href="tel:+919409658456" className="flex">
                    <Phone className="w-5 h-5 mr-2 text-theme-600" />
                    <span className="text-theme-600">+91 94096 58456</span>
                  </a>
                </li>
                <li className="flex items-center space-x-3 text-sm text-theme-600">
                  <a href="mailto:sales@khodalgems.com" className="flex">
                    <Mail className="w-5 h-5 mr-2" />
                    <span className="text-sm md:text-base">
                      sales@khodalgems.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <img
                    src={GIALogo}
                    alt="GIA Certification"
                    className="object-contain w-full h-auto"
                  />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <img
                    src={IGILogo}
                    alt="IGI Certification"
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 mt-8 text-sm text-center text-theme-600 border-t border-theme-50">
            <p>
              © {new Date().getFullYear()} Khodal Gems. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
