export type Rule = Readonly<{
  constrain: (...args: Array<any>) => boolean;
  id: string;
}>;

function Rule(spec: { constrain: (...args: Array<any>) => boolean; id: string }): Rule {
  const { constrain, id } = spec;

  return Object.freeze({
    constrain,
    id,
  });
}

export type Feature = Readonly<{
  composer: (...args: Array<any>) => any;
  id: string;
}>;

function Feature(spec: { composer: (...args: Array<any>) => any; id: string }): Feature {
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

function FeatureInstance(spec: { id: string; feature: string }): FeatureInstance {
  const { feature, id } = spec;

  return Object.freeze({
    feature,
    id,
  });
}

export type StaticProperty = Readonly<{
  id: string;
  parameterized: false;
  type: string;
}>;

function StaticProperty(spec: { id: string; type: string }): StaticProperty {
  const { id, type } = spec;

  return Object.freeze({
    id,
    parameterized: false,
    type,
  });
}

export type ParameterizedProperty = Readonly<{
  id: string;
  parameter: {};
  parameterized: true;
  type: string;
}>;

function ParameterizedProperty(spec: {
  id: string;
  parameter: {};
  type: string;
}): ParameterizedProperty {
  const { id, parameter, type } = spec;

  return Object.freeze({
    id,
    parameter,
    parameterized: true,
    type,
  });
}

export type PropertyGraph = Readonly<{
  featureIsntancesByFeature: Map<string, Set<string>>;
  featureIsntancesByProperty: Map<string, Set<string>>;
  propertiesByRule: Map<string, Set<string>>;
  rulesByProperty: Map<string, Set<string>>;
  features: Map<string, Feature>;
  id: string;
  properties: Map<string, StaticProperty | ParameterizedProperty>;
  rules: Map<string, Rule>;
}>;

function PropertyGraph(spec: {
  id: string;
  features?: Array<Feature>;
  properties?: Array<StaticProperty | ParameterizedProperty>;
  rules?: Array<Rule>;
}): PropertyGraph {
  const {
    features: presetFeatures = [],
    id,
    properties: presetProperties = [],
    rules: presetRules = [],
  } = spec;

  const features = new Map(presetFeatures.map((feature) => [feature.id, feature]));
  const properties = new Map(presetProperties.map((property) => [property.id, property]));
  const rules = new Map(presetRules.map((rule) => [rule.id, rule]));

  return Object.freeze({
    id,
    featureIsntancesByFeature: new Map(),
    featureIsntancesByProperty: new Map(),
    features,
    properties,
    propertiesByRule: new Map(),
    rules,
    rulesByProperty: new Map(),
  });
}
