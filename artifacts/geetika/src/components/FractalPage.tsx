import { Navigate } from "react-router-dom";
import { getSubpages, findCluster } from "@/data/clusters";
import { ClusterShell } from "./ClusterShell";

export default function FractalPage() {
  const c = findCluster("about");
  if (!c) return <Navigate to="/dashboard" replace />;
  const showPortrait = ["about", "works", "contact"].includes(c.slug);
  const subpages = getSubpages(c);
  return (
    <ClusterShell>
      <div />
    </ClusterShell>
  );
}
