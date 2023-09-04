import { PropertyGraph } from "#src/propertyGraph/data";

export type Engine = Readonly<{
  id: string;
  propertyGraph: PropertyGraph;
}>;

export function Engine(spec: { id: string; propertyGraph: PropertyGraph }): Engine {
  const { id, propertyGraph } = spec;

  return Object.freeze({
    id,
    propertyGraph,
  });
}
