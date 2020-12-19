import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { CurrentSlideProvider } from '../context/CurrentSlideContext'
import { ModeProvider } from '../context/ModeContext'
import MDXProvider from '../components/MDXProvider'
import { ThemeProvider } from '../components/ThemeProvider'
import TransitionPage from '../layouts/TransitionPage'
import '../public/tailwind.css'
import '../styles/globals.css'

export default ({ Component, pageProps }) => (
  <ThemeProvider>
    <MDXProvider>
      <CurrentSlideProvider>
        <ModeProvider>
          <AnimatePresence exitBeforeEnter>
            <TransitionPage>

              <div className="flex">
                <div className="flex-shrink-0 nav-shadow"></div>
                    <div className="relative w-full min-h-screen text-white">
                      <div className="absolute top-0 left-0 z-10 w-full h-full gradient"></div>
                      <div className="absolute top-0 left-0 w-full h-full pattern"></div>

                      <div className="container relative z-20 px-10 py-20 mx-auto overflow-hidden 2xl:py-28 2xl:px-0 md:px-20">
                        <div className="flex flex-wrap">
                          <div className="w-full">

                            <Component {...pageProps} />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

            </TransitionPage>
          </AnimatePresence>
        </ModeProvider>
      </CurrentSlideProvider>
    </MDXProvider>
  </ThemeProvider>
)
