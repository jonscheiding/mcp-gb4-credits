import prepareData from './prepareData';
import credits from './credits.json';

export const BASE_FONT_SIZE_PX = 15;

const SPACING = {
  title: 5,
  byline: 3,
  role: 3.5,
  name: 4,
  name_small: 3.2,

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

    for(let name of credit.Names) {
      let type = 'name';
      if(name.startsWith('- ')) {
        name = name.replace('- ', '');
        type = 'name_small';
      }

      elements.push(prepareElement(type, position, name));
    }

    position.y += SPACING.section;
  }

  return elements;
}

function prepareSectionElements(section, position) {
  const elements = [];

  if(section.Order !== 0) {
    elements.push(prepareElement("title", position, section.Title));
    position.y += SPACING.paragraph;

    if(section.Byline !== undefined) {
      for(const line of section.Byline) {
        elements.push(prepareElement("byline", position, line));
      }
    }

    position.y += SPACING.section;
  }
  
  elements.push(...prepareCreditElements(section.Credits, position));

  if(section.Other !== undefined) {
    for(const line of section.Other) {
      elements.push(prepareElement("role", position, line));
    }
    position.y += SPACING.section;
  }

  return elements;
}

export default function prepareElements() {
  const position = {y: SPACING.section, index: 0};
  const elements = [];

  const sectionCredits = prepareData(credits);

  for(const section of sectionCredits) {
    if(position.index > 0) position.y += SPACING.section;
    elements.push(...prepareSectionElements(section, position));
  }

  position.y += SPACING.section * 2;

  const width = 1920;
  const height = position.y * BASE_FONT_SIZE_PX;

  return { elements, width, height };
}
