export type StaticProperty = Readonly<{
  id: string;
  parameterized: false;
  type: string;
}>;

export function StaticProperty(spec: { id: string; type: string }): StaticProperty {
  const { id, type } = spec;

  return Object.freeze({
    id,
    parameterized: false,
    type,
  });
}

export type ParameterizedProperty = Readonly<{
  id: string;
  parameterized: true;
  type: string;
}>;

export function ParameterizedProperty(spec: { id: string; type: string }): ParameterizedProperty {
  const { id, type } = spec;

  return Object.freeze({
    id,
    parameterized: true,
    type,
  });
}

export type Property = StaticProperty | ParameterizedProperty;
