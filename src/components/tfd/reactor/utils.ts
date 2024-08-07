export const formatStat = (stat: string) => {
  switch (true) {
    case /.*Power.*/.test(stat):
      return stat.split(' Power').join('\nPower');
    case /.*When.*/.test(stat):
      return stat.split(' When Attacking ').join('\nWhen Attacking\n');
    case /.*Critical.*/.test(stat):
      return stat.split('Critical ').join('Critical\n');
    case /.*Skill.*/.test(stat):
      return stat.split('Skill ').join('Skill\n');
    case /.*Modifier.*/.test(stat):
      return stat.split(' Modifier').join('\nModifier');
    default:
      return stat;
  }
};
