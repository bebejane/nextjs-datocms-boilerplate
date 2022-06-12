import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import Link from "next/link";
import truncateMarkdown  from 'markdown-truncate'
import remarkBreaks from 'remark-breaks'
import type { UrlObject } from 'url';

type MarkdownProps = {children: string, truncate?: boolean}
type AnchorProp = {children:[any], href: UrlObject }

const Markdown = ({ children , truncate } : MarkdownProps) => {
  if(!children) return null

  const content = !truncate ? children : truncateMarkdown(children, {limit:truncate, ellipsis:true})

  return (
    <ReactMarkdown 
      remarkPlugins={[gfm, remarkBreaks]} 
      // eslint-disable-next-line react/no-children-prop
      children={content}
      components={{
        // @ts-ignore
        a: ({ children, href } : AnchorProp) => 
          <Link 
            href={href} 
            prefetch={false}
            scroll={false}
          >
            <a>{children[0]}</a>
          </Link>
      }}
    />
  )
}

export default Markdown;

