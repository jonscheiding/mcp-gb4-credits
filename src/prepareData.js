function byOrderOrTitle(a, b) {
  if(a.Order === undefined && b.Order === undefined) {
    if(a.Title < b.Title) return -1;
    if(a.Title > b.Title) return 1;
    return 0;
  }

  if(a.Order && (a.Order < b.Order || !b.Order)) {
      return -1;
  } else if(b.Order && (b.Order < a.Order || !a.Order)) {
      return 1;
  }
  return 0;
}

function addCredit(creditList, role, names) {
  if(names === undefined) return;

  for(const credit of creditList) {
    if(credit.Names === names) {
      credit.Roles.push(role);
      return;
    }
  }

  creditList.push({
    Roles: [role],
    Names: names
  });
}

function pluralizeCredits(creditList) {
  for(const credit of creditList) {
    credit.Names = credit.Names.split('\n');

    for(let i = 0; i < credit.Roles.length; i++) {
      if(credit.Names.length > 1) credit.Roles[i] += 's';
    }
  }
}

function prepareItem(item) {
  const result = {
    ...item
  };

  for(const prop of Object.keys(result)) {
    if(result[prop] === '') {
      result[prop] = undefined;
      continue;
    }
  }

  if(result.Order !== undefined) {
    result.Order = Number(result.Order);
  }

  result.Credits = [];

  addCredit(result.Credits, 'Performer', result.Cast);
  addCredit(result.Credits, 'Director', result.Director);
  addCredit(result.Credits, 'Choreographer', result.Choreographer);
  addCredit(result.Credits, 'Videographer', result.Videographer);
  addCredit(result.Credits, 'Editor', result.Editor);
  addCredit(result.Credits, 'Puppeteer', result.Puppeteer);
  
  if(result.Thanks !== undefined) {
    result.Credits.push({
      Roles: ['Special Thanks To'],
      Names: result.Thanks
    });
  }

  pluralizeCredits(result.Credits);

  result.Byline = result.Byline.split('\n');

  return result;
}

export default function prepareData(data) {
  return data
    .map(prepareItem)
    .sort(byOrderOrTitle);
}
