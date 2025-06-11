import { JSDOM } from "jsdom";

export function convertHtmlToPayloadJson(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const traverseNode = (node) => {
    let payloadNode = {};

    switch (node.nodeName.toLowerCase()) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        payloadNode = {
          type: "heading",
          tag: node.nodeName.toLowerCase(),
          children: Array.from(node.childNodes).map(traverseNode),
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
        };
        break;
      case "p":
        payloadNode = {
          type: "paragraph",
          children: Array.from(node.childNodes).map(traverseNode),
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          textFormat: 0,
        };
        break;
      case "ul":
      case "ol":
        payloadNode = {
          type: "list",
          tag: node.nodeName.toLowerCase(),
          children: Array.from(node.childNodes).map(traverseNode),
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          listType:
            node.nodeName.toLowerCase() === "ul" ? "bullet" : "numbered",
        };
        break;
      case "li":
        payloadNode = {
          type: "listitem",
          children: Array.from(node.childNodes).map(traverseNode),
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
        };
        break;
      case "blockquote":
        payloadNode = {
          type: "quote",
          children: Array.from(node.childNodes).map(traverseNode),
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
        };
        break;
      case "a":
        payloadNode = {
          type: "link",
          fields: {
            doc: null,
            url: node.getAttribute("href"),
            newTab: node.getAttribute("target") === "_blank",
            linkType: "custom",
          },
          format: "",
          indent: 0,
          version: 1,
          children: Array.from(node.childNodes).map(traverseNode),
          direction: "ltr",
        };
        break;
      case "#text":
        payloadNode = {
          type: "text",
          text: node.textContent,
          mode: "normal",
          style: "",
          detail: 0,
          format: 0,
          version: 1,
        };
        break;
      default:
        payloadNode = {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "(missing node type)",
              mode: "normal",
              style: "",
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          textFormat: 0,
        };
        break;
    }
    return payloadNode;
  };

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      children: Array.from(document.body.childNodes).map(traverseNode),
      direction: "ltr",
    },
  };
}
