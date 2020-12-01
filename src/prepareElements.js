import prepareData from './prepareData';
import credits from './credits.json';
import creditsStaff from './credits-staff.json';

export const BASE_FONT_SIZE_PX = 15;

const SPACING = {
  title: 5,
  byline: 3,
  role: 3.5,
  name: 4,

  line: 0.125,
  paragraph: 0.5,
  section: 3
}

function prepareElement(type, position, text) {
  const height = SPACING[type];
  const {y, index} = position;

  position.y += height + SPACING.line;
  position.index++;

  return {index, type, y, height, text};
}

function prepareCreditElements(credits, position) {
  const elements = [];

  for(const credit of credits) {
    for(const role of credit.Roles) {
      elements.push(prepareElement("role", position, role));
    }

    position.y += SPACING.paragraph;

    for(const name of credit.Names) {
      elements.push(prepareElement("name", position, name));
    }

    position.y += SPACING.section;
  }

  return elements;
}

function prepareSectionElements(section, position) {
  const elements = [];

  elements.push(prepareElement("title", position, section.Title));
  position.y += SPACING.paragraph;

  for(const line of section.Byline) {
    elements.push(prepareElement("byline", position, line));
  }

  position.y += SPACING.section;

  elements.push(...prepareCreditElements(section.Credits, position));

  if(section.Other !== undefined) {
    for(const line of section.Other) {
      elements.push(prepareElement("role", position, line));
    }
  }

  return elements;
}

export default function prepareElements() {
  const position = {y: SPACING.section, index: 0};
  const elements = [];

  elements.push(...prepareCreditElements(creditsStaff, position));

  const sectionCredits = prepareData(credits);

  for(const section of sectionCredits) {
    position.y += SPACING.section;
    elements.push(...prepareSectionElements(section, position));
  }

  const width = 1920;
  const height = position.y * BASE_FONT_SIZE_PX;

  return { elements, width, height };
}
