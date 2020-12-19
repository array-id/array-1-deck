import React from 'react'
import { Swipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { createGlobalStyle } from 'styled-components'
import Slide from '../components/Slide'
import PresentationMode from '../components/PresentationMode'
import useEventListener from '../hooks/useEventListener'
import { useTotalPages } from '../context/TotalPagesContext'
import { useMode } from '../context/ModeContext'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { Storage } from '../hooks/useStorage'
import { MODES } from '../constants/modes'

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #050505;
    --meta: #888;
    --accent: rgb(0, 92, 221);
    --text: #FAFAFA;
    --base: 1.5rem;
    --code: 1rem;
    --heading-font-family: "Rubik";
    --heading-font-weight: 800;
    --inlineCode-bg: hsl(222, 14%, 25%);
    --inlineCode-text: #e6e6e6;
    --deckgo-highlight-code-font-family: 'Fira Code';
    --deckgo-highlight-code-font-size: 25px;
  }

  /**
  * Based on copypasta from Remy Bach and Sarah Drasner
  */

  code[class*='language-'],
  pre[class*='language-'] {
      color: white;
      background: none;
      font-family: Fira Code, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
      font-feature-settings: normal;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      margin-bottom: 0;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
      box-shadow: none;
      font-size: 15px;
  }


  /* Code blocks */

  pre[class*='language-'] {
      overflow: auto;
      padding: 1.3125rem;
  }

  pre[class*='language-']::-moz-selection {
      /* Firefox */
      background: hsl(207, 4%, 16%);
  }

  pre[class*='language-']::selection {
      /* Safari */
      background: hsl(207, 4%, 16%);
  }


  /* Text Selection colour */

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection {
      text-shadow: none;
      background: hsla(0, 0%, 100%, 0.15);
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection {
      text-shadow: none;
      background: hsla(0, 0%, 100%, 0.15);
  }


  .token.attr-name {
      color: rgb(173, 219, 103);
      font-style: italic;
  }

  .token.comment {
      color: rgb(128, 147, 147);
  }

  .token.string,
  .token.url {
      color: rgb(173, 219, 103);
  }

  .token.variable {
      color: rgb(214, 222, 235);
  }

  .token.number {
      color: rgb(247, 140, 108);
  }

  .token.builtin,
  .token.char,
  .token.constant,
  .token.function {
      color: rgb(130, 170, 255);
  }

  .token.punctuation {
      color: rgb(199, 146, 234);
  }

  .token.selector,
  .token.doctype {
      color: rgb(199, 146, 234);
      font-style: 'italic';
  }

  .token.class-name {
      color: rgb(255, 203, 139);
  }

  .token.tag,
  .token.operator,
  .token.keyword {
      color: #ffa7c4;
  }

  .token.boolean {
      color: rgb(255, 88, 116);
  }

  .token.property {
      color: rgb(128, 203, 196);
  }

  .token.namespace {
      color: rgb(178, 204, 214);
  }

  pre[data-line] {
      padding: 1em 0 1em 3em;
      position: relative;
  }

  @media only screen and (max-width: 600px) {
      .gatsby-highlight {
          border-radius: 0px !important;
          margin-left: -2rem !important;
          margin-right: -2rem !important;
          border-radius: 0px;
      }
  }

  .gatsby-highlight-code-line {
      background-color: hsla(207, 95%, 15%, 1);
      display: block;
      margin-right: -1.3125rem;
      margin-left: -1.3125rem;
      padding-right: 1em;
      padding-left: 1.25em;
      border-left: 0.25em solid #ffa7c4;
  }

  .gatsby-highlight {
      margin-bottom: 1.75rem;
      margin-left: -1.3125rem;
      margin-right: -1.3125rem;
      border-radius: 10px;
      background: #011627;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      border-radius: 10px;
  }

  @media (max-width: 672px) {
      .gatsby-highlight {
          border-radius: 0;
      }
  }

  .gatsby-highlight pre[class*='language-'] {
      float: left;
      min-width: 100%;
  }


  /* TYPOGRAPHY THINGS*/

  @media (max-width: 600px) {
    :root {
      --base: 1.2rem;
    }
  }

  * {
    box-sizing: border-box;
  }

  body,
  html {
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: var(--base);
    -webkit-font-smoothing: antialiased;
    font-feature-settings: 'calt', 'liga', 'hist', 'onum', 'pnum';

    overflow: hidden;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    color: var(--text);
    background-color: var(--bg);
  }

  #slide {
    display: flex;
    overflow: hidden;
    justify-content: center;

    -webkit-overflow-scrolling: touch;
  }

  #slide ul,
  #slide ol {
      text-align: left;
      margin-left: 32px;
  }

  #slide ol {
    list-style: none;
    counter-reset: slide-ol-counter;
  }

  #slide ol li {
    counter-increment: slide-ol-counter;
    margin-bottom:0.5em;
  }

  #slide ol li::before {
    content: "0" counter(slide-ol-counter) ".";
    font-weight: bold;
    font-size: 2rem;
    margin-right: 0.5rem;
    letter-spacing:1px;
    font-family: var(--heading-font-family);
    line-height: 1;
    position:relative;
    top:0.1em;
}

  a {
    color: var(--text);

    text-decoration-skip-ink: auto;
  }

  blockquote {
    font-size: 120%;
    font-weight: bold;

    width: 50vw;

    text-align: left;
  }

  @media (max-width: 900px) {
    blockquote {
      width: 90vw;
    }
  }

  blockquote div::before {
    content: '\\201C';
  }

  blockquote div::after {
    content: '\\201D';
  }

  cite {
    font-size: 80%;
    font-weight: normal;
    font-style: normal;

    display: block;

    margin-top: 2rem;
  }

  cite::before {
    content: '\\2014\\00a0';
  }

  pre {
    font-size: 0.75em !important;

    display: inline-block;
    overflow-x: scroll;

    margin: 2rem 0;

    text-align: left;

    color: var(--accent);
  }

  code {
    font-family: menlo, monospace;
  }

  a:hover {
    color: var(--accent);
  }

  h1 {
    font-family: var(--heading-font-family);
    font-weight: var(--heading-font-weight);
    font-size: 200%;

    margin-bottom: 0.5rem;
  }

  h2 {
    font-family: var(--heading-font-family);
    font-weight: var(--heading-font-weight);
    font-size: 120%;

    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  header {
    font-size: 50%;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 20px;

    user-select: none;
  }

  header a,
  time {
    text-decoration: none;

    color: var(--meta);
  }

  header a:hover {
    color: var(--meta);
  }

  header span {
    color: var(--text);
  }
`

export default function SlidePage({ children }) {
  const { currentSlide, setSlide } = useCurrentSlide()
  const router = useRouter()
  const totalPages = useTotalPages()
  const {mode, setMode} = useMode()

  const NEXT = [13, 32, 39]
  const PREV = 37
  const PRESENTER = 80
  let slideCount = 0

  const navigate = ({ keyCode, altKey }) => {
    // Handle Presentation Mode shortcut
    if (altKey) {
      if (keyCode === PRESENTER) {
        if (mode === MODES.SPEAKER) {
          setMode(MODES.SLIDESHOW)
          router.push(router.pathname, `/slides/${router.query.slide}?mode=${MODES.SLIDESHOW}#${currentSlide}`, {shallow:true})
        } else {
          setMode(MODES.SPEAKER)
          router.push(router.pathname, `/slides/${router.query.slide}?mode=${MODES.SPEAKER}#${currentSlide}`, {shallow:true})
        }
        return false
      }
    }

    // Handle Previous page
    if (keyCode === PREV && currentSlide === 0) {
      if (router.query && router.query.slide) {
        if (router.query.slide > 1) {
          router.push(`/slides/${parseInt(router.query.slide, 10) - 1}?mode=${mode}#999`)
        }
      }
      return false
    }

    // Handle next page
    if (NEXT.indexOf(keyCode) !== -1 && currentSlide === slideCount) {
      if (router.query && router.query.slide) {
        // Check for max page count
        if (router.query.slide < totalPages) {
          router.push(`/slides/${parseInt(router.query.slide, 10) + 1}?mode=${mode}`)
        }
      }
      return false
    }

    // Handle slide changes
    if (NEXT.indexOf(keyCode) !== -1) {
      setSlide((prevState) => {
        router.push(`${router.pathname}`, `/slides/${router.query.slide}?mode=${mode}#${prevState + 1}`)
        return prevState + 1
      })
    } else if (keyCode === PREV) {
      setSlide((prevState) => {
        router.push(`${router.pathname}`, `/slides/${router.query.slide}?mode=${mode}#${prevState - 1}`)
        return prevState - 1
      })
    }

    let highlighter = document.getElementsByTagName('deckgo-highlight-code');

    if( highlighter && highlighter.length > 0 ) {

        highlighter[0].load()
    }

  }

  useEventListener('keydown', navigate)

  const swipeLeft = () => {
    navigate({ keyCode: NEXT[0] })
  }

  const swipeRight = () => {
    navigate({ keyCode: PREV })
  }

  const slideNotes = () => {
    let generatorCount = 0
    let generatedNotes = []
    // Filter down children by only Slides
    React.Children.map(children, (child) => {
      // Check for <hr> element to separate slides
      const childType = child && child.props && (child.props.mdxType || [])
      if (childType && childType.includes('hr')) {
        generatorCount += 1
        return
      }
      // Check if it's a SpeakerNotes component
      if (childType && childType.includes('SpeakerNotes')) {
        if (!Array.isArray(generatedNotes[generatorCount])) {
          generatedNotes[generatorCount] = []
        }
        generatedNotes[generatorCount].push(child)
      }
    })
    return generatedNotes
  }

  const renderSlide = () => {
    let generatedSlides = []
    let generatorCount = 0

    // Filter down children by only Slides
    React.Children.map(children, (child) => {
      // Check for <hr> element to separate slides
      const childType = child && child.props && (child.props.mdxType || [])
      if (childType && childType.includes('hr')) {
        generatorCount += 1
        return
      }

      // Check if it's a SpeakerNotes component
      if (childType && !childType.includes('SpeakerNotes')) {
        // Add slide content to current generated slide
        if (!Array.isArray(generatedSlides[generatorCount])) {
          generatedSlides[generatorCount] = []
        }
        generatedSlides[generatorCount].push(child)
      }
    })

    // Get total slide count
    slideCount = generatorCount

    // Return current slide
    if (currentSlide === 999) {
      router.push(router.pathname, `/slides/${router.query.slide}?mode=${mode}#${slideCount}`, { shallow: true })
      setSlide(slideCount)
    }
    return <Slide>{generatedSlides[currentSlide]}</Slide>
  }

  return (
    <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
      <GlobalStyle />
      <Storage />
      <PresentationMode
        mode={mode}
        notes={slideNotes()}
        currentSlide={currentSlide}
      >
        <div id="slide" style={{ width: '100%' }}>
          {renderSlide()}
        </div>
      </PresentationMode>
    </Swipeable>
  )
}
