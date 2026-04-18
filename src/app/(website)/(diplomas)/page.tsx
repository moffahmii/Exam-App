import { GraduationCap } from "lucide-react";
import PageWrapper from "../_components/PageWrapper";
import DiplomasList from "@/features/diplomas/components/diploma-list";

export default function DiplomasPage() {
  return (
    <PageWrapper title="All Diplomas" icon={<GraduationCap size={45}/>}>
      <DiplomasList />
    </PageWrapper>
  );
}