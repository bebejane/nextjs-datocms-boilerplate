declare module 'markdown-truncate' {
  function truncateMarkdown(string, {limit:number, ellipsis:booelan}): string;
  export = truncateMarkdown;
}