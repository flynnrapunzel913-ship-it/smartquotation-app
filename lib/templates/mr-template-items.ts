import type { QuotationItemForm } from "@/types";
import { renderTemplate } from "@/lib/utils";
import { MR_PRODUCT_DEFINITIONS } from "@/lib/templates/mr-product-definitions";

export function buildMRTemplateItems(): QuotationItemForm[] {
  return MR_PRODUCT_DEFINITIONS.map((def) => {
    const variableValues = { ...(def.defaultVariableValues ?? {}) };
    const description = renderTemplate(def.description, variableValues);
    const qty = def.defaultQty;
    const rate = def.defaultRate;

    return {
      section: def.section,
      serialNo: def.serialNo,
      category: def.category,
      title: def.title,
      description,
      warranty: def.warranty,
      qty,
      unit: def.unit,
      rate,
      amount: qty * rate,
      productId: def.id,
      variableValues,
      templateText: def.description,
      imageUrl: def.imagePath,
      imageText: def.imageText ?? null,
      poolTypeFilter: def.poolTypeFilter,
    };
  });
}
