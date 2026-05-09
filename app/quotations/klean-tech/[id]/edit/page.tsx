import KleanTechWizard from "@/components/wizard/KleanTechWizard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditKleanTechPage({ params }: Props) {
  const { id } = await params;
  return <KleanTechWizard id={id} mode="edit" />;
}
