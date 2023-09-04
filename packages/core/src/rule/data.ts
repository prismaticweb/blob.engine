export type Rule = Readonly<{
  constrain: (...args: Array<any>) => boolean;
  id: string;
}>;

export function Rule(spec: { constrain: (...args: Array<any>) => boolean; id: string }): Rule {
  const { constrain, id } = spec;

  return Object.freeze({
    constrain,
    id,
  });
}
