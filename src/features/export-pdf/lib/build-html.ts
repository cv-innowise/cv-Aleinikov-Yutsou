export async function buildHtmlWithStyles(opts: { html?: string; element?: HTMLElement }): Promise<string> {
  const { html, element } = opts;
  const bodyHtml = html ?? element?.outerHTML;
  if (!bodyHtml) throw new Error("No HTML provided");

  const linkEls = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
  const linkCssTexts = await Promise.all(
    linkEls.map(async (link) => {
      try {
        if (!link.href || !link.href.startsWith(window.location.origin)) return "";
        const res = await fetch(link.href);
        return res.ok ? await res.text() : "";
      } catch {
        return "";
      }
    })
  );

  const styleEls = Array.from(document.querySelectorAll<HTMLStyleElement>("style"));
  const inlineCssTexts = styleEls.map((el) => el.textContent || "");

  const css = [...linkCssTexts, ...inlineCssTexts].join("\n").replace(/\/\*![\s\S]*?\*\//g, "");

  const printStyles = `
    html, body { margin: 0; padding: 0; }
    @media print {
      .pdf-page { break-after: page; page-break-after: always; }
      .pdf-page:last-child { break-after: auto; page-break-after: auto; }
    }
  `;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <style>${css}\n${printStyles}</style>
  </head>
  <body>
    ${bodyHtml}
  </body>
</html>`;
}
