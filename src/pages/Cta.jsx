import React from "react";
import DotPattern from "./Dot";
import { cn } from "../utils/cn";

export default function Cta() {
    return (
        <div className="px-3 mt-20 mb-20 lg:px-8">
            
          <div className="w-full ">
            <div className="relative lg:row-span-2">
            <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_start,white,transparent)]"
          )}
        />
              <div className="relative flex h-full flex-row sm:flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Enjoy the Hello Tractor Techonlogy and download the Hello Tractor app.
                  </p>
                  <p className="mt-2 mb-4 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Revolutionize the way you buy and sell tractors with our platform. Whether you're upgrading your fleet or finding a reliable machine, we connect you with trusted buyers and sellers across the industry. Experience seamless transactions, competitive prices, and the convenience of a marketplace designed just for you.
                  </p>
                  <a
              href="https://play.google.com/store/apps/details?id=com.hellotractor.android.code&hl=en"
              className="rounded-md bg-red-500  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </a>
                </div>
                <div className="relative min-h-[30rem] sm:block w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img
                      className=" h-full w-full object-cover"
                      src="https://hellotractor.com/wp-content/uploads/2021/02/Copy-of-LonAgro-Ad-Example-2.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
          </div>
        </div>
    )
  }
  