"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPageClient() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] relative">
      <div className="bg-[#043929] bg-[url('/lpimgs/lp-s-shape2.png')] bg-center bg-no-repeat bg-cover relative overflow-hidden ">
        <section className="w-[90%] sm:w-[85%] lg:w-[80%] max-w-[1400px] mx-auto relative flex flex-col items-center lg:min-h-screen">
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
          <section className=" flex items-center justify-between w-full pb-0 mt-[10vh]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 xl:gap-20 w-full">
              {/* Left Column: Text and Button */}
              <div className="w-full lg:w-[47%] flex flex-col items-start justify-center text-white max-w-xl gap-6 sm:gap-8 text-center lg:text-left sm:justify-start sm:items-center sm:pt-8 lg:justify-center lg:items-start lg:pt-0 mb-[10vh]">
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
              <div className="w-full lg:w-[47%] relative items-center justify-center min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
                {/* QR Code - Top Left */}
                <div className="hidden lg:block absolute left-0 top-0 lg3:top-[-20px] xl:left-[-70px] z-10">
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

                {/* Female Image - Enhanced responsive positioning with smooth transitions */}
                <div className="block lg:hidden lg:absolute lg:bottom-0 md:right-[150px] lg:right-0 pointer-events-none z-10 transition-all duration-500 ease-in-out ">
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
              </div>
            </div>
          </section>

          {/* Female Image - Enhanced responsive positioning with smooth transitions */}
          <div className="hidden lg:block lg:absolute lg:bottom-0 md:right-[150px] lg:right-0 pointer-events-none z-10 transition-all duration-500 ease-in-out">
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

          <div className="bg-[#CEEEE5] rounded-3xl w-full mx-auto px-0 py-0 overflow-hidden flex flex-col md3:flex-row items-stretch mt-10">
            {/* Left Column: Mountains background */}
            <div
              className="w-full md3:w-[50%]  min-w-0 relative flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/lpimgs/lp-mountains.png')" }}
            >
              <div className="w-full flex flex-col gap-6 sm:gap-8 p-10 lg:p-14 text-left">
                <h2 className="text-4xl md2:text-5xl font-bold font-brico leading-[1.2] text-black">
                  Your Currency. <br />
                  Your Method. <br />
                  Your Way
                </h2>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#4B5563]">
                  Send in your local currency, use your preferred local method-
                  bank transfer, mobile wallet
                </p>
                <Link
                  href="/send"
                  className="bg-primary-green px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full z-10 transition-all duration-300 hover:bg-opacity-90 active:scale-95 hover:shadow-lg text-white w-fit"
                >
                  Get started now
                </Link>
              </div>
            </div>
            {/* Right Column: Dashimg */}
            <div className="flex-1 flex-col relative flex items-center justify-end">
              <Image
                src="/lpimgs/lp-dashimg.png"
                alt="Dashimg"
                width={320}
                height={320}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="w-full mx-auto px-0 py-0 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Column */}
            <div className="rounded-3xl overflow-hidden h-[700px]">
              <Image
                src="/lpimgs/lp-girl-pressing-phone.png"
                alt="Dashimg"
                width={320}
                height={320}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Content Column */}
            <div
              className="rounded-3xl bg-[#E1D9FC] relative flex flex-col items-center justify-between overflow-hidden h-[700px]"
              style={{
                backgroundImage: "url('/lpimgs/lp-s-shape.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for background opacity */}
              <div className="absolute inset-0 bg-[#E1D9FC] opacity-90 pointer-events-none z-0" />
              <div className="relative z-10 w-full flex flex-col items-center justify-between h-full">
                <div className="flex flex-col text-left p-8 pb-0 md:p-16 md:pb-0 gap-6 ">
                  <h2 className="text-4xl lg3:text-5xl font-bold font-brico leading-[1.2] text-black">
                    We Process and <br />
                    Deliver Instantly
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#4B5563]">
                    We handle the conversion and routing behind the scenes. No
                    stress and no waiting
                  </p>
                  <Link
                    href="/send"
                    className="bg-primary-green px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full z-10 transition-all duration-300 hover:bg-opacity-90 active:scale-95 hover:shadow-lg text-white w-fit"
                  >
                    Get started now
                  </Link>
                </div>
                <div className="flex justify-end w-full mr-16">
                  <Image
                    src="/lpimgs/lp-refresh-arrow.png"
                    alt="Dashimg"
                    width={320}
                    height={320}
                    className="w-[200px] h-[200px] object-contain"
                    priority
                  />
                </div>
                <div className="relative ">
                  <Image
                    src="/lpimgs/lp-globe.png"
                    alt="Dashimg"
                    width={320}
                    height={320}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#ECF5FF] rounded-3xl w-full mx-auto pt-16 flex flex-col items-center justify-center md3:flex-row md3:justify-between relative mt-10">
            <div className="w-full md3:w-[60%] flex flex-col items-center md3:items-start gap-8 p-10 ">
              <div className="flex items-center justify-center md3:items-start relative gap-6 ">
                <h3 className="text-4xl lg:text-5xl font-bold font-brico leading-tight sm:leading-snug lg:leading-[1.1] text-center md3:text-left w-fit ">
                  Receiver Gets Paid Fast
                </h3>
                <div className="hidden md3:flex">
                  <div className="relative w-[70px] h-[70px]">
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
              <p className="text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed max-w-lg mx-auto lg:mx-0 text-[#4B5563] text-center md3:text-left">
                Recipients gets the money in their own local currency-directly
                to their bank or wallet
              </p>
              <Link
                href="/send"
                className="bg-[#041152] px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full z-10 transition-all duration-300 hover:bg-opacity-90 active:scale-95 hover:shadow-lg text-white w-fit"
              >
                Get started now
              </Link>
            </div>

            {/* Image Container with responsive positioning */}
            <div className="w-full md3:w-[40%] relative min-h-[300px] hidden md3:flex justify-center md3:justify-end ">
              <Image
                src="/lpimgs/lp-female-holding-hand2.png"
                alt="Female holding hand 2"
                width={320}
                height={320}
                className=""
                priority
              />
            </div>

            <Image
              src="/lpimgs/lp-arrow2.svg"
              alt="Dashed line arrow"
              width={400}
              height={120}
              className="object-contain w-[50%] lg2:w-[60%] xl:w-[70%] absolute left-0 bottom-0 hidden lg:flex"
            />
          </div>
        </section>
      </div>

      <div className="w-full bg-[#022219]">
        <div className="py-16 md:py-32 w-[90%] sm:w-[85%] lg:w-[80%] max-w-[1400px] mx-auto relative flex flex-col items-center justify-center gap-6 ">
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
            <h3 className="text-[21px] sm:text-[27px] sm2:text-[32px] md:text-[38px] font-brico capitalize font-bold relative text-white text-center">
              Why people use
              <br />
              <span className="relative inline-block">
                Paystup
                <span className="absolute left-0 right-0 bottom-[-2px] h-3 pointer-events-none select-none flex justify-center">
                  <Image
                    src="/lpimgs/lp-africa-squiggle.svg"
                    alt="squiggle underline"
                    width={120}
                    height={16}
                    className="w-full h-3 object-contain"
                  />
                </span>
              </span>
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

          <div className="grid grid-cols-1 md3:grid-cols-2 gap-10 w-full mt-8">
            <div className="bg-[#06563E66] rounded-2xl min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center p-8 md:p-16">
              <div className="h-[120px] md3:h-[200px] w-full flex justify-end ">
                {/* No image */}
              </div>

              <div className="w-full flex flex-col gap-3 text-white">
                <h4 className="text-3xl font-semibold font-brico">
                  Fast Transfers
                </h4>
                <p className="">Money arrives in minutes, not days</p>
              </div>
            </div>

            <div className="bg-[#06563E66] rounded-2xl min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center p-8 md:p-16">
              <div className="w-full flex justify-end">
                <Image
                  src="/lpimgs/lp-money-note.png"
                  alt="Money note"
                  width={80}
                  height={80}
                  className="w-[40%] md3:w-[60%] h-auto object-contain"
                  priority
                />
              </div>

              <div className="w-full flex flex-col gap-3 text-white">
                <h4 className="text-3xl font-semibold font-brico">Low Fees</h4>
                <p className="">
                  What you see is what you pay, No hidden charges
                </p>
              </div>
            </div>

            <div className="bg-[#06563E66] rounded-2xl min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center p-8 md:p-16">
              <div className="w-full flex justify-end">
                <Image
                  src="/lpimgs/lp-compass.png"
                  alt="Money note"
                  width={80}
                  height={80}
                  className="w-[40%] md3:w-[60%] h-auto object-contain "
                  priority
                />
              </div>

              <div className="w-full flex flex-col gap-3 text-white">
                <h4 className="text-3xl font-semibold font-brico">
                  Easy to Use
                </h4>
                <p className="">
                  No complex forms. No banking headache. Just send and go
                </p>
              </div>
            </div>

            <div className="bg-[#06563E66] rounded-2xl min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center p-8 md:p-16">
              <div className="h-[120px] md3:h-[200px] w-full flex justify-end">
                {/* No Image */}
              </div>

              <div className="w-full flex flex-col gap-3 text-white">
                <h4 className="text-3xl font-semibold font-brico">
                  Reliable Across boarders
                </h4>
                <p className="">
                  From Nigeria to India, we&apos;re built for this
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="py-16 md:py-32 w-[90%] sm:w-[85%] lg:w-[80%] max-w-[1400px] mx-auto relative flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-4 relative">
            <span className="bg-[#E1D9FC] border-[#6A42F2] border font-brico text-[14px] px-8 py-3 rounded-lg w-fit">
              Who is it for?
            </span>

            <h3 className="text-[21px] sm:text-[27px] sm2:text-[32px] md:text-[38px] font-brico capitalize font-bold relative text-[#111827] text-center w-[90%] sm:w-[80%] md:w-[70%] md3:w-[60%]">
              Made for Everyday People, Built for Global Impact
            </h3>
          </div>

          <div className="grid grid-cols-1 md3:grid-cols-2 gap-10 w-full mt-8">
            <div className="bg-[#E1D9FC] rounded-2xl flex flex-col items-center justify-center p-10 gap-4 text-center">
              <Image
                src="/lpimgs/lp-globe2.png"
                alt="Money note"
                width={80}
                height={80}
                className="w-[120px] md3:w-[200px] h-auto object-contain"
                priority
              />

              <div className="w-full flex flex-col gap-1 items-center justify-center">
                <h4 className="text-3xl font-semibold font-brico text-black">
                  Fast Transfers
                </h4>
                <p className="text-[#4B5563]">
                  Money arrives in minutes, not days
                </p>
              </div>
            </div>

            <div className="bg-[#E1D9FC] rounded-2xl flex flex-col items-center justify-center p-10 gap-4 text-center">
              <Image
                src="/lpimgs/lp-hands-lifting-people.png"
                alt="Money note"
                width={80}
                height={80}
                className="w-[120px] md3:w-[200px] h-auto object-contain"
                priority
              />

              <div className="w-full flex flex-col gap-1 items-center justify-center">
                <h4 className="text-3xl font-semibold font-brico text-black">
                  Families & Loved Ones
                </h4>
                <p className="text-[#4B5563]">
                  Support your people across boarders- without stress or high
                  fees
                </p>
              </div>
            </div>

            <div className="bg-[#E1D9FC] rounded-2xl flex flex-col items-center justify-center md3:flex-row-reverse p-10 gap-4 text-center md3:text-left md3:col-span-2">
              <Image
                src="/lpimgs/lp-briefcase.png"
                alt="Money note"
                width={80}
                height={80}
                className="w-[120px] md3:w-[200px] h-auto object-contain"
                priority
              />

              <div className="w-full flex flex-col items-center justify-center md3:items-start md3:justify-start gap-1">
                <h4 className="text-3xl font-semibold font-brico text-black">
                  Small Business Owners
                </h4>
                <p className="text-[#4B5563] w-full md3:w-[70%]">
                  Pay international suppliers and partners without complicated
                  banking steps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#022219] overflow-hidden md3:h-[500px]">
        <div className="w-[90%] sm:w-[85%] lg:w-[80%] max-w-[1400px] mx-auto relative flex flex-col md3:flex-row items-center justify-center md3:justify-between gap-6 h-full ">
          <div className="pt-16 pb-4 md:pt-32 md:pb-8 text-white w-full md3:w-[50%] flex flex-col gap-4 items-center justify-center md3:items-start md3:justify-start ">
            <h4 className="text-3xl lg:text-4xl font-semibold font-brico text-center md3:text-left">
              What Makes Paystup Different
            </h4>
            <ul className="space-y-1 text-white md3:pl-6 flex flex-col items-center md3:items-start">
              <li className="flex items-start ">
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Designed specifically for Africa to Asia transfers
              </li>
              <li className="flex items-start ">
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Local payment methods on both sides
              </li>
              <li className="flex items-start ">
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Transparent pricing
              </li>
              <li className="flex items-start ">
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Fast delivery time
              </li>
            </ul>
            <p className="text-xl">Join the movement now!</p>

            <div className="w-fit flex items-center gap-6 mt-4">
              <Link href="/" className="">
                <Image
                  src="/lpimgs/lp-google-play.png"
                  alt="Money note"
                  width={250}
                  height={800}
                  className="w-[150px] md3:w-[220px] h-auto object-contain"
                  priority
                />
              </Link>

              <Link href="/" className="">
                <Image
                  src="/lpimgs/lp-apple-store.png"
                  alt="Money note"
                  width={250}
                  height={800}
                  className="w-[150px] md3:w-[220px] h-auto object-contain"
                  priority
                />
              </Link>
            </div>
          </div>

          <div className="w-full md3:w-[35%] relative flex justify-center md3:justify-end h-full">
            <Image
              src="/lpimgs/lp-iphone16.png"
              alt="Money note"
              width={250}
              height={400}
              className="w-[50%] md3:w-[70%] h-auto object-contain md3:absolute md3:bottom-0 md3:right-0"
              priority
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#043929] py-16">
        <div className="bg-[#85D5BD] rounded-4xl sm:rounded-full w-[90%] mx-auto flex flex-col sm:flex-row items-center justify-between overflow-hidden">
          <Link
            href="/"
            className="text-[#111827] bg-[#85D5BD] hover:bg-[#043929] font-brico py-4 px-6 hover:text-white"
          >
            FAQs
          </Link>

          <Link
            href="/"
            className="text-[#111827] bg-[#85D5BD] hover:bg-[#043929] font-brico py-4 px-6 hover:text-white"
          >
            Help centre
          </Link>

          <Link
            href="/"
            className="text-[#111827] bg-[#85D5BD] hover:bg-[#043929] font-brico py-4 px-6 hover:text-white"
          >
            Privacy
          </Link>

          <Link
            href="/"
            className="text-[#111827] bg-[#85D5BD] hover:bg-[#043929] font-brico py-4 px-6 hover:text-white"
          >
            Terms
          </Link>
        </div>
      </div>

      <div className="w-full bg-[#043929] pt-6 pb-24">
        <div className="w-[90%] max-w-[1400px] mx-auto relative flex flex-col items-center md:items-start md:flex-row justify-center md:justify-between gap-6">
          <h1 className="text-5xl xl:text-6xl font-black text-white font-brico w-fit mb-6">
            Paystup
          </h1>

          <div className="w-fit flex flex-col items-end text-white gap-6">
            <div className="flex gap-6 items-center">
              {[
                {
                  href: "https://linkedin.com/",
                  icon: "/lpimgs/lp-social-ln.svg",
                  alt: "LinkedIn",
                },
                {
                  href: "https://instagram.com/",
                  icon: "/lpimgs/lp-social-ins.svg",
                  alt: "Instagram",
                },
                {
                  href: "https://twitter.com/",
                  icon: "/lpimgs/lp-social-x.svg",
                  alt: "Twitter/X",
                },
                {
                  href: "https://facebook.com/",
                  icon: "/lpimgs/lp-social-fb.svg",
                  alt: "Facebook",
                }
              ].map(({ href, icon, alt }) => (
                <Link
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[50px] h-[50px] rounded-full border-2 border-white flex items-center justify-center bg-transparent hover:bg-white/20 transition"
                >
                  <Image
                    src={icon}
                    alt={alt}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
            <p className="">
              &copy; {new Date().getFullYear()} Paystup. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
