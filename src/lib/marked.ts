import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-go";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

const marked = new Marked(
  markedHighlight({
    highlight(code, lang) {
      if (prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang);
      } else {
        return code;
      }
    },
  }),
);

// external link
marked.use({
  extensions: [
    {
      name: "link",
      renderer(token) {
        return `<a href="${token.href}"${token.title ? ` title="${token.title}"` : ""} ${token.href.startsWith("http") ? ` target="_blank" rel="noopener noreferrer"` : ""}>${token.text}</a>`;
      },
    },
  ],
});

export function parseMarkdown(body: string) {
  const parsed = marked.parse(body);

  return parsed;
}
