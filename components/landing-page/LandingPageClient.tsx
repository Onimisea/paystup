"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPageClient() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] relative">
      <div className="bg-[#043929] bg-[url('/lpimgs/lp-s-shape2.png')] bg-center bg-no-repeat bg-cover min-h-screen relative overflow-hidden">
        <section className="w-[90%] sm:w-[85%] lg:w-[80%] max-w-[1400px] mx-auto relative flex flex-col items-center justify-center min-h-screen">
          {/* Header */}
          <header className="py-10 flex items-center justify-center lg:justify-between relative z-20 w-full">
            <h1 className="text-5xl xl:text-6xl font-black text-white font-brico">
              Paystup
            </h1>
            <Link
              className="hidden lg:block rounded-full bg-primary-green px-4 py-2 sm:px-6 sm:py-3 lg:px-7 lg:py-3 text-white text-sm sm:text-base transition-all duration-300 hover:bg-opacity-90 active:scale-95"
              href="/auth/signup"
            >
              Get Started
            </Link>
          </header>

          {/* Main Content */}
          <section className="flex-1 flex items-center justify-between w-full pb-[120%] lg:items-center lg:pb-0">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 xl:gap-20 w-full">
              {/* Left Column: Text and Button */}
              <div className="w-full lg:w-[47%] flex flex-col items-start justify-center text-white max-w-xl gap-6 sm:gap-8 text-center lg:text-left sm:justify-start sm:items-center sm:pt-8 lg:justify-center lg:items-start lg:pt-0">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-brico leading-tight sm:leading-snug lg:leading-[1.1]">
                  Send money across{" "}
                  <span className="relative inline-block">
                    Africa
                    <span className="absolute left-0 right-0 bottom-[-2px] sm:bottom-[-4px] h-3 sm:h-4 pointer-events-none select-none flex justify-center">
                      <Image
                        src="/lpimgs/lp-africa-squiggle.svg"
                        alt="squiggle underline"
                        width={120}
                        height={16}
                        className="w-full h-3 sm:h-4 object-contain"
                      />
                    </span>
                  </span>{" "}
                  to{" "}
                  <span className="relative inline-block">
                    Asia
                    <span className="absolute left-0 right-0 bottom-[-2px] sm:bottom-[-4px] h-3 sm:h-4 pointer-events-none select-none flex justify-center">
                      <Image
                        src="/lpimgs/lp-asia-squiggle.svg"
                        alt="squiggle underline"
                        width={90}
                        height={16}
                        className="w-full h-3 sm:h-4 object-contain"
                      />
                    </span>
                  </span>{" "}
                  in Seconds
                </h2>
                <p className="text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Skip the banks. Forget delays. Paystup gets your money where
                  it needs to go - fast, easy and affordable.
                </p>
                <Link
                  href="/send"
                  className="bg-primary-green px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full z-10 transition-all duration-300 hover:bg-opacity-90 active:scale-95 hover:shadow-lg mx-auto lg:mx-0"
                >
                  Send money now
                </Link>
              </div>

              {/* Right Column: QR Code only */}
              <div className="hidden lg:block  w-full lg:w-[47%] relative items-center justify-center min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
                {/* QR Code - Top Left */}
                <div className="absolute left-0 top-[-20px] lg3:top-[-80px] xl:left-[-130px] z-10">
                  <Image
                    src="/lpimgs/lp-QRCode.png"
                    alt="QR Code"
                    width={120}
                    height={120}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                  />
                  <div className="relative">
                    <div className="absolute top-[-5px] left-[50px] sm:left-[60px] lg:left-[70px] w-[100px] sm:w-[120px] lg:w-[130px]">
                      <small className="text-[#0BAB7CB2] text-xs sm:text-sm">
                        Scan to download
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Female Image - Enhanced responsive positioning with smooth transitions */}
          <div className="hidden sm:block lg:absolute lg:bottom-0 md:right-[150px] lg:right-0 pointer-events-none z-10 transition-all duration-500 ease-in-out">
            <Image
              src="/lpimgs/lp-female-holding-hand.png"
              alt="Female holding hand"
              width={300}
              height={600}
              className={`
      object-contain w-auto max-w-none transition-all duration-500 ease-in-out
      h-[clamp(350px,55vh,450px)] 
      absolute left-1/2 transform -translate-x-[calc(50%-65px)] bottom-0
      
      md:h-[clamp(400px,60vh,500px)] 
      md:left-1/2 md:-translate-x-[calc(50%-65px)]
      
      md2:h-[clamp(350px,45vh,450px)] 
      md2:left-1/2 md2:-translate-x-[calc(50%-65px)]
      
      [@media(min-width:640px)_and_(max-height:600px)]:h-[clamp(250px,40vh,350px)]
      [@media(min-width:640px)_and_(max-height:500px)]:h-[clamp(200px,35vh,300px)]
      
      md3:h-[clamp(400px,50vh,500px)] 
      md3:left-1/2 md3:-translate-x-[calc(50%-65px)]
      
      lg:h-[55vh] lg:right-0 lg:left-auto lg:transform-none lg:translate-x-0 lg:relative
      lg3:h-[60vh] 
      xl:h-[65vh] 
      2xl:h-[70vh]
      
      [@media(min-width:1024px)_and_(max-height:700px)]:lg:h-[45vh]
      [@media(min-width:1024px)_and_(max-height:600px)]:lg:h-[40vh]
    `}
            />
          </div>

          {/* Dashed Arrow - Responsive */}
          <Image
            src="/lpimgs/lp-hero-dashed.svg"
            alt="Dashed line arrow"
            width={400}
            height={120}
            className="object-contain w-[50%] lg2:w-[60%] xl:w-[70%] absolute left-0 bottom-0 hidden lg:flex"
          />
        </section>
      </div>

      <div className="bg-white w-full">
        <section className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] lg3:w-[50%] xl:w-[40%] max-w-[1400px] mx-auto relative flex flex-col items-center justify-center py-28 text-center gap-6">
          <div className="relative">
            <div className="flex items-center justify-center gap-4 relative">
              <h3 className="text-[21px] sm:text-[27px] md:text-[32px] md3:text-[38px] font-brico capitalize text-[#0BAB7C] font-bold relative">
                Send money without borders
              </h3>

              {/* Star behind first letter "S" */}
              <svg
                className="absolute top-[10px] left-[-10px] w-8 h-8 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-70"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="50"
                  y1="10"
                  x2="50"
                  y2="90"
                  stroke="#0BAB7C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="19.3"
                  y1="25"
                  x2="80.7"
                  y2="75"
                  stroke="#0BAB7C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="80.7"
                  y1="25"
                  x2="19.3"
                  y2="75"
                  stroke="#0BAB7C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              {/* Star behind last letter "s" */}
              <svg
                className="absolute top-[10px] right-[-10px] w-8 h-8 -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-70"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="50"
                  y1="10"
                  x2="50"
                  y2="90"
                  stroke="#0BAB7C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="19.3"
                  y1="25"
                  x2="80.7"
                  y2="75"
                  stroke="#0BAB7C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="80.7"
                  y1="25"
                  x2="19.3"
                  y2="75"
                  stroke="#0BAB7C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <p className="text-[min(10vw,24px)]">
            Built for the people moving money between Africa and Asia. Finally a
            smarter way to send and receive funds
          </p>
        </section>
      </div>

      <div className="bg-[#F9FAFB] w-full">
        <section className="w-[90%] sm:w-[85%] max-w-[1400px] mx-auto relative flex flex-col items-center justify-center py-20 text-center gap-6">
          <div className="relative flex flex-col items-center justify-center gap-6">
            <span className="bg-[#CEEEE5] border-[#0BAB7C] border font-brico text-[14px] px-8 py-3 rounded-lg w-fit">
              How it works
            </span>

            <div className="flex items-center justify-center gap-4 relative">
              <div className="absolute left-[-70px] sm2:left-[-100px]">
                <div className="relative w-[80px] h-[80px] sm2:w-[100px] sm2:h-[100px]">
                  <Image
                    src="/lpimgs/lp-star.svg"
                    alt="Star 1"
                    width={20}
                    height={20}
                    className="absolute top-0 left-[50px] w-[20px] h-[20px]"
                  />
                  <Image
                    src="/lpimgs/lp-star.svg"
                    alt="Star 2"
                    width={32}
                    height={32}
                    className="absolute bottom-[20px] left-0 w-8 h-8"
                  />
                  <Image
                    src="/lpimgs/lp-star.svg"
                    alt="Star 3"
                    width={27}
                    height={27}
                    className="absolute bottom-[-10px] right-[-30px] w-7 h-7"
                  />
                </div>
              </div>
              <h3 className="text-[21px] sm:text-[27px] sm2:text-[32px] md:text-[38px] font-brico capitalize text-black font-bold relative">
                Money Sent Without
                <br />
                Complications
              </h3>
              <div className="absolute right-[-70px] sm2:right-[-100px]">
                <div className="relative w-[80px] h-[80px] sm2:w-[100px] sm2:h-[100px]">
                  <Image
                    src="/lpimgs/lp-star.svg"
                    alt="Star 1"
                    width={20}
                    height={20}
                    className="absolute top-0 right-[50px] w-[20px] h-[20px]"
                  />
                  <Image
                    src="/lpimgs/lp-star.svg"
                    alt="Star 2"
                    width={32}
                    height={32}
                    className="absolute bottom-[20px] right-0 w-8 h-8"
                  />
                  <Image
                    src="/lpimgs/lp-star.svg"
                    alt="Star 3"
                    width={27}
                    height={27}
                    className="absolute bottom-[-10px] left-[-30px] w-7 h-7"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
