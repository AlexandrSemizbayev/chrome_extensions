type TASCIIRange = [number,number]
type TUnflattenedArray = Array<TASCIIRange>;
type TDictOfActions = typeof dictOfActions;
export type TActionNames = TDictOfActions[keyof TDictOfActions];
type IActions = {
  [K in TActionNames]: (arr:TUnflattenedArray) => void
}
const dictOfActions = {
  iD: 'includeDigits',
  iC: 'includeChars',
  iL: 'includeLetters',
} as const;

function add<T>(original:T[], arrToAdd:T[]): void { original.push(...arrToAdd)};


const actions: IActions = {
  [dictOfActions.iD]: (arr) => add(arr,[[48,57]]),
  [dictOfActions.iC]: (arr) => add(arr,[[33,47],[58,64],[91,96],[123,126]]),
  [dictOfActions.iL]:(arr) => add(arr,[
    [97,122], // LowerCase
    [65,90] // UpperCase
  ]),
};


function combineSelectedASCIICodes(actionsChain: Array<TActionNames>) {
  let tmp:TUnflattenedArray = [];
  const tmpActions = {...actions};
  actionsChain.forEach((actionKey) => {
    if(actionKey in tmpActions) {
      tmpActions[actionKey](tmp);
      delete tmpActions[actionKey];
    }
  });
  if(!tmp.length) {throw Error('Unable to generate a password, since no options were selected')}
  const result = tmp.map(([a,b]) => {
    const subResult = [];
    for(let i = a; i <= b; i++) {
      subResult.push(i);
    }
    return subResult;
  }).flat().sort((a,b) => a - b );
  return result;
}

export function generateStrongPassword(length: number, actionsChain: Array<TActionNames>) {
  const allowedChars = combineSelectedASCIICodes(actionsChain);
  let resultingString = '';
  for(let i = 0; i < length; i++) {
    resultingString += String.fromCharCode(allowedChars[Math.floor(Math.random() * allowedChars.length)])
  }
  return resultingString;
}
