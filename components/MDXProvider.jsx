import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia'
import '@deckdeckgo/highlight-code';
import { defineCustomElements as deckDeckGoElement } from '@deckdeckgo/highlight-code/dist/loader';
import SlidePage from '../layouts/SlidePage'
import Cover from './Cover'
import SpeakerNotes from './SpeakerNotes'


deckDeckGoElement();

const mdComponents = {
  h1: (props) => <h1 {...props} />,
  pre: (props) => props.children,
  code: (props) => {
    const { className, children } = props
    const languageRaw = className.replace('language-', '')
    const toHighlight = languageRaw.substr(languageRaw.indexOf('{')).replace(/{|}/gi, '').replace(/\|/gi, ' ')
    const language    = languageRaw.split('{')[0]

    return (
      <deckgo-highlight-code
        language={language}
        theme="dracula"
        highlight-lines={toHighlight}
      >
          <code slot="code">
            { children }
          </code>
      </deckgo-highlight-code>
    )
  },
  Cover,
  SlidePage,
  SpeakerNotes,
}

export default ({ children }) => (
  <MDXProvider components={mdComponents}>{children}</MDXProvider>
)
