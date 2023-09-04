export type Contract = Readonly<{
  id: string;
  properties: Set<string>;
  type: string;
}>;

export function Contract(spec: { id: string; type: string }): Contract {
  const { id, type } = spec;

  return Object.freeze({
    id,
    properties: new Set<string>([]),
    type,
  });
}
