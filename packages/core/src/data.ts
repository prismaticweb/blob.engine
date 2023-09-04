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

export type Property = StaticProperty | ParameterizedProperty;

export type PropertyGraph = Readonly<{
  featureInstancesByFeature: Map<string, Map<string, FeatureInstance>>;
  featureInstancesByProperty: Map<string, Map<string, FeatureInstance>>;
  propertiesByRule: Map<string, Set<string>>;
  rulesByProperty: Map<string, Set<string>>;
  features: Map<string, Feature>;
  id: string;
  properties: Map<string, Property>;
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

  const featureInstancesByFeature = new Map();
  const featureInstancesByProperty = new Map();
  const propertiesByRule = new Map();
  const rulesByProperty = new Map();

  const features = new Map(
    presetFeatures.map((feature) => {
      const featureId = feature.id;

      featureInstancesByFeature.set(featureId, new Map());

      return [featureId, feature];
    }),
  );

  const properties = new Map(
    presetProperties.map((property) => {
      const propertyId = property.id;

      featureInstancesByProperty.set(propertyId, new Map());
      rulesByProperty.set(propertyId, new Set());

      return [propertyId, property];
    }),
  );

  const rules = new Map(
    presetRules.map((rule) => {
      const ruleId = rule.id;

      propertiesByRule.set(ruleId, new Set());

      return [ruleId, rule];
    }),
  );

  return Object.freeze({
    id,
    featureInstancesByFeature,
    featureInstancesByProperty,
    features,
    properties,
    propertiesByRule,
    rulesByProperty,
    rules,
    rulesByProperty: new Map(),
  });
}
