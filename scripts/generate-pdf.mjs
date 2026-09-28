import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { getCvData, locales } from "../src/data/index.ts";

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 34;
const bottomMargin = 34;
const contentWidth = pageWidth - margin * 2;

const colors = {
  text: "#1c2733",
  soft: "#64717f",
  accent: "#406f74",
  gold: "#c7a34b",
  line: "#d9e1df",
  surface: "#f7fbfa",
  surfaceStrong: "#fbfdfc",
  surfaceWarm: "#faf7ee",
};

const fontWidthFactor = {
  F1: 0.48,
  F2: 0.52,
};

const sanitize = (value) =>
  String(value)
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/→/g, "->")
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "OE")
    .replace(/µ/g, "micro")
    .replace(/…/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "");

const pdfText = (value) =>
  sanitize(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const hexToRgb = (hex) => {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16) / 255,
    Number.parseInt(value.slice(2, 4), 16) / 255,
    Number.parseInt(value.slice(4, 6), 16) / 255,
  ];
};

const colorCommand = (hex, operator = "rg") =>
  `${hexToRgb(hex).map((value) => value.toFixed(3)).join(" ")} ${operator}`;

const textWidth = (text, size, font = "F1") => sanitize(text).length * size * fontWidthFactor[font];

const wrapText = (text, maxWidth, size, font = "F1") => {
  const words = sanitize(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (textWidth(candidate, size, font) <= maxWidth) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
};

const estimateParagraphHeight = (text, maxWidth, size, lineHeight, font = "F1") =>
  wrapText(text, maxWidth, size, font).length * lineHeight;

const estimateTagsHeight = (items, maxWidth) => {
  const tagHeight = 13.5;
  const gap = 4.2;
  let rows = 1;
  let cursorX = 0;

  for (const item of items) {
    const width = Math.min(textWidth(item, 6.8, "F2") + 10.5, maxWidth);
    if (cursorX > 0 && cursorX + width > maxWidth) {
      rows += 1;
      cursorX = 0;
    }
    cursorX += width + gap;
  }

  return rows * (tagHeight + gap) + 4;
};

const compactPeriod = (period) =>
  period
    .replace(/^d['’]/i, "")
    .replace(/^de\s+/i, "")
    .replace(/^from\s+/i, "")
    .replace(/\s+(?:à|to)\s+/i, " -> ");

const generatePdfForLocale = async (locale) => {
  const { profile, contactLinks, experiences, skillCategories, educationItems, ui } = getCvData(locale);
  const outputPath = resolve("public", ui.pdfFilename);
  const photoPath = resolve("public", profile.photo.src.replace(/^\//u, ""));
  const profilePhoto = await readFile(photoPath);
  const siteUrl = `https://cv.fabien-rouget.fr/${locale}/`;

  const pages = [];
  let currentPage;
  let y;

  const addPage = () => {
    currentPage = { commands: [], links: [] };
    pages.push(currentPage);
    y = pageHeight - margin;
  };

  const add = (command) => {
    currentPage.commands.push(command);
  };

  const addLink = (x, rectY, width, height, uri) => {
    const x2 = x + width;
    const y2 = rectY + height;
    currentPage.links.push(
      `<< /Type /Annot /Subtype /Link /Rect [${x.toFixed(2)} ${rectY.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}] /Border [0 0 0] /A << /Type /Action /S /URI /URI (${pdfText(uri)}) >> >>`
    );
  };

  const drawText = (text, x, baseline, size, { font = "F1", color = colors.text, href } = {}) => {
    add(`${colorCommand(color)} BT /${font} ${size.toFixed(2)} Tf 1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(2)} Tm (${pdfText(text)}) Tj ET\n`);
    if (href) {
      addLink(x, baseline - 2, textWidth(text, size, font), size + 3, href);
    }
  };

  const drawLine = (fromX, lineY, toX, color = colors.line) => {
    add(`${colorCommand(color, "RG")} 0.65 w ${fromX.toFixed(2)} ${lineY.toFixed(2)} m ${toX.toFixed(2)} ${lineY.toFixed(2)} l S\n`);
  };

  const drawRect = (x, rectY, width, height, color, strokeColor) => {
    if (strokeColor) {
      add(`${colorCommand(color)} ${colorCommand(strokeColor, "RG")} ${x.toFixed(2)} ${rectY.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re B\n`);
      return;
    }
    add(`${colorCommand(color)} ${x.toFixed(2)} ${rectY.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re f\n`);
  };

  const drawDot = (x, dotY, size = 3.0, color = colors.gold) => {
    drawRect(x, dotY, size, size, color);
  };

  const drawImage = (name, x, imageY, width, height) => {
    add(`q ${width.toFixed(2)} 0 0 ${height.toFixed(2)} ${x.toFixed(2)} ${imageY.toFixed(2)} cm /${name} Do Q\n`);
  };

  const drawFooter = () => {
    const pageNumber = pages.length;
    drawLine(margin, 26, pageWidth - margin, "#edf1f0");
    drawText(`${ui.pdfFooterPrefix} ${pageNumber}`, margin, 15, 7.5, { color: colors.soft });
    const siteLabel = `cv.fabien-rouget.fr/${locale}`;
    const siteLabelWidth = textWidth(siteLabel, 7.5, "F1");
    drawText(siteLabel, pageWidth - margin - siteLabelWidth, 15, 7.5, {
      color: colors.accent,
      href: siteUrl,
    });
  };

  const ensureSpace = (height) => {
    if (y - height < bottomMargin) {
      drawFooter();
      addPage();
    }
  };

  const drawParagraph = (text, x, maxWidth, size, options = {}) => {
    const lineHeight = options.lineHeight ?? size * 1.38;
    const lines = wrapText(text, maxWidth, size, options.font ?? "F1");
    for (const line of lines) {
      ensureSpace(lineHeight + 3);
      drawText(line, x, y, size, options);
      y -= lineHeight;
    }
    return lines.length;
  };

  const drawSectionTitle = (title) => {
    ensureSpace(34);
    y -= 8;
    drawText(title, margin, y, 13.5, { font: "F2", color: colors.accent });
    y -= 7;
    drawLine(margin, y, pageWidth - margin, colors.gold);
    y -= 13;
  };

  const drawTags = (items, x, maxWidth, startCursorY = y) => {
    let cursorX = x;
    let cursorY = startCursorY;
    const tagHeight = 13.5;
    const gap = 4.2;

    for (const item of items) {
      const width = Math.min(textWidth(item, 6.8, "F2") + 10.5, maxWidth);
      if (cursorX > x && cursorX + width > x + maxWidth) {
        cursorX = x;
        cursorY -= tagHeight + gap;
      }

      drawRect(cursorX, cursorY - 9, width, tagHeight, "#eef5f4", "#d3e0de");
      drawText(item, cursorX + 5.2, cursorY - 4.6, 6.8, { font: "F2", color: colors.accent });
      cursorX += width + gap;
    }

    y = cursorY - tagHeight - 4;
    return y;
  };

  const drawHeader = () => {
    const headerHeight = 114;
    drawRect(0, pageHeight - headerHeight, pageWidth, headerHeight, "#f2f8f7");
    drawRect(0, pageHeight - headerHeight - 3.5, pageWidth, 3.5, colors.gold);

    const photoSize = 74;
    const photoX = pageWidth - margin - photoSize;
    const photoY = pageHeight - margin - photoSize + 6;
    const textMaxWidth = contentWidth - photoSize - 26;
    drawRect(photoX - 4, photoY - 4, photoSize + 8, photoSize + 8, "#ffffff", "#dce6e4");
    drawImage("Photo", photoX, photoY, photoSize, photoSize);

    y = pageHeight - margin + 2;
    drawText(profile.name, margin, y, 25, { font: "F2", color: colors.text });
    y -= 21;
    drawText(profile.title, margin, y, 11, { font: "F2", color: colors.accent });
    y -= 15;
    drawParagraph(profile.heroSummary, margin, textMaxWidth, 9.4, { color: colors.text, lineHeight: 12.8 });

    const emailLink = contactLinks.find((link) => link.label === "Email");
    const linkedinLink = contactLinks.find((link) => link.label === "Linkedin");
    y -= 2;

    let contactX = margin;
    if (emailLink) {
      drawText(emailLink.value, contactX, y, 8.3, {
        color: colors.accent,
        font: "F2",
        href: emailLink.href,
      });
      contactX += textWidth(emailLink.value, 8.3, "F2") + 8;
      drawText("|", contactX, y, 8.3, { color: colors.soft });
      contactX += 10;
    }

    if (linkedinLink) {
      const cleanLinkedin = linkedinLink.href.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/u, "");
      drawText(cleanLinkedin, contactX, y, 8.3, {
        color: colors.accent,
        font: "F2",
        href: linkedinLink.href,
      });
      contactX += textWidth(cleanLinkedin, 8.3, "F2") + 8;
      drawText("|", contactX, y, 8.3, { color: colors.soft });
      contactX += 10;
    }

    drawText(`cv.fabien-rouget.fr/${locale}`, contactX, y, 8.3, {
      color: colors.accent,
      font: "F2",
      href: siteUrl,
    });

    y = pageHeight - headerHeight - 10;
  };

  const drawExpertise = () => {
    drawSectionTitle(profile.valueTitle);
    const columnGap = 14;
    const columnWidth = (contentWidth - columnGap) / 2;
    const cardHeight = 58;
    const rowGap = 9;
    const rowHeight = cardHeight + rowGap;
    const rowCount = Math.ceil(profile.strengths.length / 2);
    const startY = y + 2;

    ensureSpace(rowCount * rowHeight + 4);

    profile.strengths.forEach((strength, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = margin + column * (columnWidth + columnGap);
      const blockY = startY - row * rowHeight;

      drawRect(x, blockY - cardHeight, columnWidth, cardHeight, colors.surface, "#dce6e4");
      drawRect(x, blockY - cardHeight, 3, cardHeight, colors.gold);
      drawText(strength.title, x + 11, blockY - 14, 9.2, { font: "F2", color: colors.text });
      const previousY = y;
      y = blockY - 28;
      drawParagraph(strength.description, x + 11, columnWidth - 20, 8.0, {
        color: colors.soft,
        lineHeight: 10.4,
      });
      y = previousY;
    });

    y = startY - rowCount * rowHeight - 2;
  };

  const estimateExperienceHeight = (experience) => {
    const innerWidth = contentWidth - 24;
    const contextHeight = estimateParagraphHeight(experience.context, innerWidth, 8.6, 11.4);
    const impactsHeight = experience.impacts.reduce(
      (height, impact) => height + estimateParagraphHeight(impact, innerWidth - 14, 8.4, 11.2) + 1,
      0
    );
    const tagsHeight = estimateTagsHeight(experience.stack, innerWidth - 14);

    return 18 + 11.5 + 11.5 + contextHeight + 3 + impactsHeight + tagsHeight + 7;
  };

  const drawExperience = (experience) => {
    const cardHeight = estimateExperienceHeight(experience);
    ensureSpace(cardHeight + 8);

    const cardTop = y + 3;
    const cardX = margin;
    const cardWidth = contentWidth;
    const innerX = cardX + 12;
    const innerWidth = cardWidth - 24;

    drawRect(cardX, cardTop - cardHeight, cardWidth, cardHeight, colors.surfaceStrong, "#dfe8e6");
    drawRect(cardX, cardTop - cardHeight, 3, cardHeight, colors.gold);

    y = cardTop - 15;
    drawText(experience.role, innerX, y, 11.5, { font: "F2", color: colors.text });
    y -= 11.5;
    drawText(`${experience.company} - ${experience.location} - ${compactPeriod(experience.period)}`, innerX, y, 8.4, {
      font: "F2",
      color: colors.soft,
    });
    y -= 11.5;
    drawParagraph(experience.context, innerX, innerWidth, 8.6, { color: colors.soft, lineHeight: 11.4 });
    y -= 3;

    for (const impact of experience.impacts) {
      ensureSpace(14);
      drawDot(innerX + 2, y + 2.8, 2.6);
      drawParagraph(impact, innerX + 13, innerWidth - 13, 8.4, { color: colors.text, lineHeight: 11.2 });
      y -= 1;
    }

    drawTags(experience.stack, innerX + 13, innerWidth - 13);
    y = cardTop - cardHeight - 5.5;
  };

  const drawSkills = () => {
    drawSectionTitle(ui.skillsTitle);
    const columnGap = 16;
    const columnWidth = (contentWidth - columnGap) / 2;
    const rowCount = Math.ceil(skillCategories.length / 2);

    for (let row = 0; row < rowCount; row += 1) {
      const leftCat = skillCategories[row * 2];
      const rightCat = skillCategories[row * 2 + 1];
      const leftHeight = leftCat ? 14 + estimateTagsHeight(leftCat.items, columnWidth) : 0;
      const rightHeight = rightCat ? 14 + estimateTagsHeight(rightCat.items, columnWidth) : 0;
      const rowHeight = Math.max(leftHeight, rightHeight);

      ensureSpace(rowHeight + 6);
      const rowStartY = y;

      if (leftCat) {
        drawText(leftCat.title, margin, rowStartY, 9.5, { font: "F2", color: colors.text });
        drawTags(leftCat.items, margin, columnWidth, rowStartY - 14);
      }

      if (rightCat) {
        const rightX = margin + columnWidth + columnGap;
        drawText(rightCat.title, rightX, rowStartY, 9.5, { font: "F2", color: colors.text });
        drawTags(rightCat.items, rightX, columnWidth, rowStartY - 14);
      }

      y = rowStartY - rowHeight - 4;
    }
  };

  const drawEducationAndNotes = () => {
    const columnGap = 20;
    const leftWidth = contentWidth * 0.58;
    const rightWidth = contentWidth - leftWidth - columnGap;
    const rightX = margin + leftWidth + columnGap;

    const neededHeight = 34 + Math.max(educationItems.length * 28, profile.personalNotes.length * 16);
    ensureSpace(neededHeight);

    y -= 8;
    const titleY = y;
    drawText(ui.educationTitle, margin, titleY, 13.5, { font: "F2", color: colors.accent });
    drawText(profile.personalNotesTitle, rightX, titleY, 13.5, { font: "F2", color: colors.accent });
    const lineY = titleY - 7;
    drawLine(margin, lineY, margin + leftWidth, colors.gold);
    drawLine(rightX, lineY, pageWidth - margin, colors.gold);

    let leftY = lineY - 14;
    for (const item of educationItems) {
      drawText(item.degree, margin, leftY, 9.5, { font: "F2", color: colors.text });
      leftY -= 12;
      drawText(item.details, margin, leftY, 8.5, { color: colors.soft });
      leftY -= 15;
    }

    let rightY = lineY - 14;
    for (const note of profile.personalNotes) {
      drawDot(rightX + 2, rightY + 2.8, 2.8);
      drawText(note, rightX + 12, rightY, 8.8, { color: colors.text });
      rightY -= 15;
    }

    y = Math.min(leftY, rightY);
  };

  const buildPdf = () => {
    const objects = [];
    const addObject = (id, content) => {
      objects[id] = Buffer.isBuffer(content) ? content : Buffer.from(content, "latin1");
    };

    const pageIds = [];
    const contentIds = [];
    pages.forEach((page, index) => {
      const content = Buffer.from(page.commands.join(""), "latin1");
      const contentId = 6 + index * 2;
      const pageId = contentId + 1;
      contentIds.push(contentId);
      pageIds.push(pageId);
      addObject(
        contentId,
        Buffer.concat([
          Buffer.from(`<< /Length ${content.length} >>\nstream\n`, "latin1"),
          content,
          Buffer.from("\nendstream", "latin1"),
        ])
      );
      const annotsEntry = page.links.length > 0 ? ` /Annots [${page.links.join(" ")}]` : "";
      addObject(
        pageId,
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Photo 5 0 R >> >> /Contents ${contentId} 0 R${annotsEntry} >>`
      );
    });

    addObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
    addObject(2, `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
    addObject(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    addObject(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    addObject(
      5,
      Buffer.concat([
        Buffer.from(
          `<< /Type /XObject /Subtype /Image /Width 400 /Height 400 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${profilePhoto.length} >>\nstream\n`,
          "latin1"
        ),
        profilePhoto,
        Buffer.from("\nendstream", "latin1"),
      ])
    );

    const chunks = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "latin1")];
    const offsets = [0];

    for (let id = 1; id < objects.length; id += 1) {
      offsets[id] = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      chunks.push(Buffer.from(`${id} 0 obj\n`, "latin1"));
      chunks.push(objects[id]);
      chunks.push(Buffer.from("\nendobj\n", "latin1"));
    }

    const startXref = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const xref = [
      "xref",
      `0 ${objects.length}`,
      "0000000000 65535 f ",
      ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `),
      "trailer",
      `<< /Size ${objects.length} /Root 1 0 R >>`,
      "startxref",
      String(startXref),
      "%%EOF",
    ].join("\n");

    chunks.push(Buffer.from(xref, "latin1"));
    return Buffer.concat(chunks);
  };

  addPage();
  drawHeader();
  drawExpertise();
  drawSectionTitle(ui.experiencesTitle);
  experiences.forEach(drawExperience);
  drawSkills();
  drawEducationAndNotes();
  drawFooter();

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buildPdf());

  console.log(`PDF generated (${locale}, ${pages.length} pages): ${outputPath}`);
};

for (const locale of locales) {
  await generatePdfForLocale(locale);
}
