export const attributesArray = ['Non-attribute', 'Chill', 'Fire', 'Electric', 'Toxic'] as const;
export type AttributesType = (typeof attributesArray)[number];

type AttributeImages = {
  attribute: string;
  fragment: string;
}

export const attributeImages = attributesArray.reduce((acc, attribute ) => {
  acc[attribute] = {
    attribute: `/assets/images/attribute/${attribute.toLowerCase()}.png`,
    fragment: `/assets/images/fragment/${attribute.toLowerCase()}.png`,
  }

  return acc
}, {} as Record<AttributesType, AttributeImages>)
