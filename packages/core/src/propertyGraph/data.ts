import { Rule } from "#src/rule/data";
import { Property } from "#src/property/data";
import { Feature, FeatureInstance } from "#src/feature/data";

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

export function PropertyGraph(spec: {
  id: string;
  features?: Array<Feature>;
  properties?: Array<Property>;
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
  });
}
