import { QuotationFormValues } from "@/types";
import { buildMRTemplateItems } from "@/lib/templates/mr-template-items";

export const MR_MASTER_TEMPLATE: Partial<QuotationFormValues> = {
  gstPercent: 18,
  projectSpecifications: {
    poolLength: "",
    poolWidth: "",
    poolDepth: "",
    poolVolume: "",
    plantRoomSize: "",
    shapeOfPool: "",
    typeOfPool: "",
    kidPoolLength: "",
    kidPoolWidth: "",
    kidPoolDepth: "",
    balancingTankLength: "",
    balancingTankWidth: "",
    balancingTankDepth: "",
    plantRoomLength: "",
    plantRoomWidth: "",
    plantRoomHeight: "",
    turnoverPeriod: "",
  },
  sections: [
    { code: "A", title: "PLANT ROOM EQUIPMENTS", included: true, sortOrder: 1 },
    { code: "B", title: "FILTRATION ROOM ELECTRICAL WORK", included: true, sortOrder: 2 },
    { code: "C", title: "ELECTRICAL CONTROL PANEL WITH TIMER", included: true, sortOrder: 3 },
    { code: "D", title: "SUPPLY OF SWIMMING POOL MAINTENANCE CLEANING KIT", included: true, sortOrder: 4 },
    { code: "Part 2", title: "Part2:POOL FINISHES", included: true, sortOrder: 5 },
  ],
  items: buildMRTemplateItems(),
  terms: `1. Single phase connection up to the plant room is in your scope of work.
2. Back wash line after the plant room and water supply to balance tank is in your scope.
3. All Civil works are at your scope.
4. Rates are valid for 30 days from the date of quotation.`,
  paymentTerms: `1. 30% Payment along with the PO.
2. 30% payment after bar bending.
3. 30% During tile fixing work.
4. 10% On successful commissioning and testing.`,
  notes: "",
};
