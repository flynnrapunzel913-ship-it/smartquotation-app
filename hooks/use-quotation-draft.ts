import { create } from "zustand";
import type { QuotationFormSchema } from "@/lib/validations/quotation";

type DraftState = {
  draft: Partial<QuotationFormSchema> | null;
  setDraft: (d: Partial<QuotationFormSchema>) => void;
  clear: () => void;
};

export const useQuotationDraftStore = create<DraftState>((set) => ({
  draft: null,
  setDraft: (d) => set({ draft: d }),
  clear: () => set({ draft: null }),
}));
