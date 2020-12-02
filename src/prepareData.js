function byOrderOrTitle(a, b) {
  if(isNaN(a.Order) && isNaN(b.Order)) {
    if(a.Title < b.Title) return -1;
    if(a.Title > b.Title) return 1;
  }

  if(!isNaN(a.Order) && isNaN(b.Order)) return -1;
  if(isNaN(a.Order) && !isNaN(b.Order)) return 1;

  if(a.Order < b.Order) return -1;
  if(a.Order > b.Order) return 1;

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

function createByline(result) {
  if(result.Show === undefined) {
    return undefined;
  }

  const byline = [`from "${result.Show}"`];
  if(result.Music !== undefined) {
    if(result.Music === result.Lyrics) {
      byline.push(`Music and Lyrics by ${result.Music}`);
    } else {
      byline.push(
        `Music by ${result.Music}`,
        `Lyrics by ${result.Lyrics}`
      );
    }
  } else if (result.Writer !== undefined) {
    byline.push(
      `Written by ${result.Writer}`,
      `Adapted by ${result.Adapter}`
    );
  }

  return byline;
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

  result.Order = Number(result.Order);
  if(isNaN(result.Order)) result.Order = undefined;

  result.Credits = [];

  const roles = [
    'Producer', 'Performer', 'Director', 'Choreographer',
    'Videographer', 'Editor', 'Puppeteer',
    'Music Director', 'Technical Director', 'Sound Engineer'
  ];

  for(const role of roles) {
    addCredit(result.Credits, role, result[role]);
  }

  pluralizeCredits(result.Credits);

  if(result.Thanks !== undefined) {
    result.Credits.push({
      Roles: ['Special Thanks To'],
      Names: result.Thanks.split('\n')
    });
  }

  result.Byline = createByline(result);

  if(result.Other !== undefined) {
    result.Other = result.Other.split('\n');
  }

  return result;
}

export default function prepareData(data) {
  return data
    .map(prepareItem)
    .sort(byOrderOrTitle);
}
