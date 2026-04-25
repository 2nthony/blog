import { get } from "lodash-es";

export const PropertyRetrievers: { [propertyType: string]: string } = {
  date: "date.start",
  title: "title[0].text.content",
  rich_text: "rich_text[0].text.content",
  last_edited_time: "last_edited_time",
  multi_select: "multi_select",
};

export function retriever(property: any) {
  const keypath = PropertyRetrievers[property.type];

  return get(property, keypath);
}
