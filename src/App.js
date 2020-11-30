import prepareData from './prepareData';

import credits from './credits.json';
import creditsStaff from './credits-staff.json';
import './App.css';

const Spacing = {
  title: 5,
  byline: 3,
  role: 3.5,
  name: 4,

  line: 0.125,
  paragraph: 0.5,
  section: 3
}

function Text({y, className, height, children}) {
  return (
    <text x="50%" y={y * 16} className={className}
      style={{fontSize: `${height}rem`}}>
      {children}
    </text>
  );
}

function createCreditRoles(data, position) {
  let y = position.y;
  const elements = [];

  for(const credit of data) {
    for(const role of credit.Roles) {
      elements.push(<Text className="role" y={y} height={Spacing.role}>{role}</Text>);
      y += Spacing.role + Spacing.line;
    }

    y += Spacing.paragraph;

    for(const name of credit.Names) {
      elements.push(<Text className="name" y={y} height={Spacing.name}>{name}</Text>);
      y += Spacing.name + Spacing.line;
    }

    y += Spacing.section;
  }

  position.y = y;
  return elements;
}

function createStaffCredit(data, position) {
  const elements = createCreditRoles(data, position);
  position.y += Spacing.section * 2;
  return elements;
}

function createCredit(data, position) {
  let y = position.y;
  const elements = [];

  elements.push(<Text className="title" y={y} height={Spacing.title}>{data.Title}</Text>);
  y += Spacing.title + Spacing.paragraph;

  for(const line of data.Byline) {
    elements.push(<Text className="byline" y={y} height={Spacing.byline}>{line}</Text>);
    y += Spacing.byline + Spacing.line;
  }

  y += Spacing.section;

  position.y = y;
  elements.push(...createCreditRoles(data.Credits, position));
  y = position.y;

  if(data.Other !== undefined) {
    for(const line of data.Other.split('\n')) {
      elements.push(<Text className="role" y={y} height={Spacing.role}>{line}</Text>);
      y += Spacing.role + Spacing.line;
    }
  }

  y += Spacing.section * 2;

  position.y = y;
  return <>{elements}</>;
}

function App() {
  const preparedData = prepareData(credits);

  let position = {y: 0};

  const elements = [
    createStaffCredit(creditsStaff, position),
    ...preparedData.map(data => createCredit(data, position))
  ];

  return (
    <svg width={960} height={position.y * 16 / 2} viewBox={`0 0 1920 ${position.y * 16}`}>
      {elements}
    </svg>
  );
}

export default App;
