import { QuotationFormValues } from "@/types";
import { buildMRTemplateItems } from "@/lib/templates/mr-template-items";

export const MR_MASTER_TEMPLATE: Partial<QuotationFormValues> = {
  gstPercent: 18,
  projectSpecifications: {
    poolLength: "30",
    poolWidth: "60",
    poolDepth: "4.5",
    poolVolume: "8100 Cft",
    plantRoomSize: "12'X12'X6'",
    shapeOfPool: "Designer Pool",
    typeOfPool: "Overflow Pool",
    kidPoolLength: "10",
    kidPoolWidth: "10",
    kidPoolDepth: "2.5",
    balancingTankLength: "12",
    balancingTankWidth: "12",
    balancingTankDepth: "6",
    plantRoomLength: "12",
    plantRoomWidth: "12",
    plantRoomHeight: "6",
    turnoverPeriod: "4 Hours",
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
