import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { contactLinks } from "../src/data/contact.ts";
import { educationItems } from "../src/data/education.ts";
import { experiences } from "../src/data/experience.ts";
import { profile } from "../src/data/profile.ts";
import { skillCategories } from "../src/data/skills.ts";

const outputPath = resolve("public/cv-fabien-rouget.pdf");
const photoPath = resolve("public", profile.photo.src.replace(/^\//u, ""));
const profilePhoto = await readFile(photoPath);
const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 42;
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

const pages = [];
let currentPage;
let y;

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

const addPage = () => {
  currentPage = [];
  pages.push(currentPage);
  y = pageHeight - margin;
};

const add = (command) => {
  currentPage.push(command);
};

const ensureSpace = (height) => {
  if (y - height < margin) {
    drawFooter();
    addPage();
  }
};

const ensureGroupSpace = (height) => {
  if (y - height < margin) {
    drawFooter();
    addPage();
  }
};

const drawText = (text, x, baseline, size, { font = "F1", color = colors.text } = {}) => {
  add(`${colorCommand(color)} BT /${font} ${size.toFixed(2)} Tf 1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(2)} Tm (${pdfText(text)}) Tj ET\n`);
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

const drawDot = (x, dotY, size = 3.2, color = colors.gold) => {
  drawRect(x, dotY, size, size, color);
};

const drawImage = (name, x, imageY, width, height) => {
  add(`q ${width.toFixed(2)} 0 0 ${height.toFixed(2)} ${x.toFixed(2)} ${imageY.toFixed(2)} cm /${name} Do Q\n`);
};

const drawParagraph = (text, x, maxWidth, size, options = {}) => {
  const lineHeight = options.lineHeight ?? size * 1.45;
  const lines = wrapText(text, maxWidth, size, options.font ?? "F1");
  for (const line of lines) {
    ensureSpace(lineHeight + 4);
    drawText(line, x, y, size, options);
    y -= lineHeight;
  }
  return lines.length;
};

const estimateParagraphHeight = (text, maxWidth, size, lineHeight, font = "F1") =>
  wrapText(text, maxWidth, size, font).length * lineHeight;

const drawSectionTitle = (title) => {
  ensureSpace(42);
  y -= 12;
  drawText(title, margin, y, 15, { font: "F2", color: colors.accent });
  y -= 9;
  drawLine(margin, y, pageWidth - margin, colors.gold);
  y -= 18;
};

const drawFooter = () => {
  const pageNumber = pages.length;
  drawLine(margin, 32, pageWidth - margin, "#edf1f0");
  drawText(`Fabien Rouget - CV - page ${pageNumber}`, margin, 20, 7.5, { color: colors.soft });
};

const drawTags = (items, x, maxWidth) => {
  let cursorX = x;
  let cursorY = y;
  const tagHeight = 15;
  const gap = 5;

  for (const item of items) {
    const width = Math.min(textWidth(item, 7.1, "F2") + 12, maxWidth);
    if (cursorX + width > x + maxWidth) {
      cursorX = x;
      cursorY -= tagHeight + gap;
    }

    ensureSpace(tagHeight + 8);
    drawRect(cursorX, cursorY - 10, width, tagHeight, "#eef5f4", "#d3e0de");
    drawText(item, cursorX + 6, cursorY - 5.2, 7.1, { font: "F2", color: colors.accent });
    cursorX += width + gap;
  }

  y = cursorY - tagHeight - 8;
};

const estimateTagsHeight = (items, maxWidth) => {
  const tagHeight = 15;
  const gap = 5;
  let rows = 1;
  let cursorX = 0;

  for (const item of items) {
    const width = Math.min(textWidth(item, 7.1, "F2") + 12, maxWidth);
    if (cursorX > 0 && cursorX + width > maxWidth) {
      rows += 1;
      cursorX = 0;
    }
    cursorX += width + gap;
  }

  return rows * (tagHeight + gap) + 8;
};

const estimateClosingSectionsHeight = () => {
  const sectionTitleHeight = 42;
  const skillsHeight =
    sectionTitleHeight +
    skillCategories.reduce(
      (height, category) => height + 18 + estimateTagsHeight(category.items, contentWidth) + 4,
      0
    );
  const educationHeight = sectionTitleHeight + educationItems.length * 31;
  const personalNotesHeight = sectionTitleHeight + profile.personalNotes.length * 16;

  return skillsHeight + educationHeight + personalNotesHeight + 12;
};

const compactPeriod = (period) =>
  period
    .replace(/^d['’]/i, "")
    .replace(/^de\s+/i, "")
    .replace(/\s+à\s+/i, " -> ");

const drawHeader = () => {
  drawRect(0, pageHeight - 132, pageWidth, 132, "#f2f8f7");
  drawRect(0, pageHeight - 136, pageWidth, 4, colors.gold);

  const photoSize = 82;
  const photoX = pageWidth - margin - photoSize;
  const photoY = pageHeight - margin - photoSize + 1;
  const textMaxWidth = contentWidth - photoSize - 30;
  drawRect(photoX - 5, photoY - 5, photoSize + 10, photoSize + 10, "#ffffff", "#dce6e4");
  drawImage("Photo", photoX, photoY, photoSize, photoSize);

  drawText(profile.name, margin, y, 28, { font: "F2", color: colors.text });
  y -= 25;
  drawText(profile.title, margin, y, 11.5, { font: "F2", color: colors.accent });
  y -= 18;
  drawParagraph(profile.heroSummary, margin, textMaxWidth, 10, { color: colors.text, lineHeight: 14 });

  const email = contactLinks.find((link) => link.label === "Email")?.value;
  const linkedin = contactLinks.find((link) => link.label === "Linkedin")?.href;
  y -= 4;
  drawText([email, linkedin].filter(Boolean).join("  |  "), margin, y, 8.5, { color: colors.soft });
  y -= 26;
};

const drawExpertise = () => {
  drawSectionTitle(profile.valueTitle);
  const columnGap = 18;
  const columnWidth = (contentWidth - columnGap) / 2;
  const cardHeight = 72;
  const rowGap = 12;
  const rowHeight = cardHeight + rowGap;
  const rowCount = Math.ceil(profile.strengths.length / 2);
  const startY = y;

  ensureSpace(rowCount * rowHeight + 6);

  profile.strengths.forEach((strength, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + column * (columnWidth + columnGap);
    const blockY = startY - row * rowHeight;

    drawRect(x, blockY - cardHeight, columnWidth, cardHeight, colors.surface, "#dce6e4");
    drawRect(x, blockY - cardHeight, 3, cardHeight, colors.gold);
    drawText(strength.title, x + 12, blockY - 16, 9.5, { font: "F2", color: colors.text });
    const previousY = y;
    y = blockY - 33;
    drawParagraph(strength.description, x + 12, columnWidth - 24, 8.2, { color: colors.soft, lineHeight: 10.8 });
    y = previousY;
  });

  y = startY - rowCount * rowHeight - 4;
};

const estimateExperienceHeight = (experience) => {
  const innerWidth = contentWidth - 26;
  const contextHeight = estimateParagraphHeight(experience.context, innerWidth, 9, 12.5);
  const impactsHeight = experience.impacts.reduce(
    (height, impact) => height + estimateParagraphHeight(impact, innerWidth - 16, 8.8, 12.5) + 1,
    0
  );
  const tagsHeight = estimateTagsHeight(experience.stack, innerWidth - 16);

  return 24 + 13 + 13 + contextHeight + 5 + impactsHeight + tagsHeight + 10;
};

const drawExperience = (experience) => {
  const cardHeight = estimateExperienceHeight(experience);
  ensureSpace(cardHeight + 12);

  const cardTop = y + 4;
  const cardX = margin;
  const cardWidth = contentWidth;
  const innerX = cardX + 13;
  const innerWidth = cardWidth - 26;

  drawRect(cardX, cardTop - cardHeight, cardWidth, cardHeight, colors.surfaceStrong, "#dfe8e6");
  drawRect(cardX, cardTop - cardHeight, 3, cardHeight, colors.gold);

  y = cardTop - 18;
  drawText(experience.role, innerX, y, 12.7, { font: "F2", color: colors.text });
  y -= 13;
  drawText(`${experience.company} - ${experience.location} - ${compactPeriod(experience.period)}`, innerX, y, 8.8, {
    font: "F2",
    color: colors.soft,
  });
  y -= 13;
  drawParagraph(experience.context, innerX, innerWidth, 9, { color: colors.soft, lineHeight: 12.5 });
  y -= 4;

  for (const impact of experience.impacts) {
    ensureSpace(18);
    drawDot(innerX + 2, y + 3.2, 2.8);
    drawParagraph(impact, innerX + 15, innerWidth - 15, 8.8, { color: colors.text, lineHeight: 12.5 });
    y -= 1;
  }

  drawTags(experience.stack, innerX + 16, innerWidth - 16);
  y = cardTop - cardHeight - 8;
};

const drawSkills = () => {
  drawSectionTitle("Compétences");
  for (const category of skillCategories) {
    ensureSpace(48);
    drawText(category.title, margin, y, 10.5, { font: "F2", color: colors.text });
    y -= 18;
    drawTags(category.items, margin, contentWidth);
    y -= 4;
  }
};

const drawEducation = () => {
  drawSectionTitle("Formations");
  for (const item of educationItems) {
    ensureSpace(34);
    drawText(item.degree, margin, y, 10.5, { font: "F2", color: colors.text });
    y -= 13;
    drawText(item.details, margin, y, 9, { color: colors.soft });
    y -= 18;
  }

  drawSectionTitle(profile.personalNotesTitle);
  for (const note of profile.personalNotes) {
    ensureSpace(18);
    drawDot(margin + 5, y + 3.2, 3);
    drawText(note, margin + 16, y, 9, { color: colors.text });
    y -= 16;
  }
};

const drawClosingSections = () => {
  ensureGroupSpace(estimateClosingSectionsHeight());
  drawSkills();
  drawEducation();
};

const buildPdf = () => {
  const objects = [];
  const addObject = (id, content) => {
    objects[id] = Buffer.isBuffer(content) ? content : Buffer.from(content, "latin1");
  };

  const pageIds = [];
  const contentIds = [];
  pages.forEach((page, index) => {
    const content = Buffer.from(page.join(""), "latin1");
    const contentId = 6 + index * 2;
    const pageId = contentId + 1;
    contentIds.push(contentId);
    pageIds.push(pageId);
    addObject(contentId, Buffer.concat([
      Buffer.from(`<< /Length ${content.length} >>\nstream\n`, "latin1"),
      content,
      Buffer.from("\nendstream", "latin1"),
    ]));
    addObject(
      pageId,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Photo 5 0 R >> >> /Contents ${contentId} 0 R >>`
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
drawSectionTitle("Expériences");
experiences.forEach(drawExperience);
drawClosingSections();
drawFooter();

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, buildPdf());

console.log(`PDF generated: ${outputPath}`);
