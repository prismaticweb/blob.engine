export type Feature = Readonly<{
  composer: (...args: Array<any>) => any;
  id: string;
}>;

export function Feature(spec: { composer: (...args: Array<any>) => any; id: string }): Feature {
  const { composer, id } = spec;

  return Object.freeze({
    composer,
    id,
  });
}

export type FeatureInstance = Readonly<{
  id: string;
  feature: string;
}>;

export function FeatureInstance(spec: { id: string; feature: string }): FeatureInstance {
  const { feature, id } = spec;

  return Object.freeze({
    feature,
    id,
  });
}