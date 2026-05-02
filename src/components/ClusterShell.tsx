import { ReactNode, useState } from "react";
import { NavLink, Link, useParams, useLocation } from "react-router-dom";
import { ChevronRight, Home, ArrowLeft, ChevronDown } from "lucide-react";
import { SiteNav, SiteFooter } from "./SiteChrome";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { CLUSTERS, GRAND_GROUPS, findCluster, findSubpage, findGrandGroup } from "@/data/clusters";

function ClusterSidebar({ clusterSlug }: { clusterSlug: string }) {
  const location = useLocation();
  const cluster = findCluster(clusterSlug);
  if (!cluster) return null;
  const Icon = cluster.icon;
  // intra-page nav uses hash anchors; "overview" = no hash
  const linkFor = (slug: string) => slug === "overview" ? `/${cluster.slug}` : `/${cluster.slug}#${slug}`;
  const isActiveSub = (slug: string) =>
    (slug === "overview" && !location.hash) || location.hash === `#${slug}`;
  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="bg-paper">
        <div className="px-4 py-5 border-b border-border">
          <Link to="/dashboard" className="flex items-center gap-2 text-ink-soft hover:text-gold transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em]">Dashboard</span>
          </Link>
          <div className="mt-3 flex items-center gap-2.5">
            <Icon className="w-4 h-4 text-gold shrink-0" />
            <span className="font-display text-lg leading-tight text-ink truncate">{cluster.label}</span>
          </div>
          <p className="font-mono text-[0.6rem] text-gold tracking-widest mt-1">§ {cluster.num}</p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
            Fractal Rails
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {cluster.subpages.filter((s) => s.kind !== "topic").map((s) => (
                <SidebarMenuItem key={s.slug}>
                  <SidebarMenuButton asChild>
                    <a
                      href={linkFor(s.slug)}
                      className={`font-mono text-xs tracking-wide ${isActiveSub(s.slug) ? "text-gold bg-paper-deep" : "text-ink hover:text-gold"}`}
                    >
                      <span className="text-gold mr-1">·</span>{s.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {cluster.subpages.some((s) => s.kind === "topic") && (
          <SidebarGroup>
            <SidebarGroupLabel className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
              Topics
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {cluster.subpages.filter((s) => s.kind === "topic").map((s) => (
                  <SidebarMenuItem key={s.slug}>
                    <SidebarMenuButton asChild>
                      <a
                        href={linkFor(s.slug)}
                        className={`font-display text-sm ${isActiveSub(s.slug) ? "text-gold" : "text-ink hover:text-gold"}`}
                      >
                        {s.label}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {GRAND_GROUPS.map((g) => {
          const GI = g.icon;
          const currentGroup = findGrandGroup(cluster.slug);
          return (
            <CollapsibleGroup
              key={g.slug}
              title={g.label}
              icon={GI}
              defaultOpen={currentGroup?.slug === g.slug}
            >
              {g.clusterSlugs.map((cs) => {
                const cc = findCluster(cs);
                if (!cc) return null;
                const CI = cc.icon;
                const isCurrent = cc.slug === cluster.slug;
                return (
                  <SidebarMenuItem key={cs}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={`/${cc.slug}`}
                        className={`font-mono text-[0.7rem] tracking-wide flex items-center gap-2 ${
                          isCurrent ? "text-gold" : "text-ink-soft hover:text-gold"
                        }`}
                      >
                        <CI className="w-3 h-3" />
                        <span className="truncate">{cc.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </CollapsibleGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

function CollapsibleGroup({
  title, icon: Icon, defaultOpen = false, children,
}: { title: string; icon: React.ComponentType<{ className?: string }>; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <SidebarGroup>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-2 py-1.5 flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
      >
        <Icon className="w-3 h-3" />
        <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase flex-1 text-left">{title}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <SidebarGroupContent>
          <SidebarMenu>{children}</SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
}

export function Breadcrumbs({ cluster, sub }: { cluster: string; sub?: string }) {
  const c = findCluster(cluster);
  const s = c && sub ? findSubpage(c, sub) : undefined;
  return (
    <nav className="flex items-center gap-2 text-[0.7rem] font-mono uppercase tracking-[0.2em] text-muted-foreground">
      <Link to="/" className="hover:text-gold flex items-center gap-1.5"><Home className="w-3 h-3" />Home</Link>
      <ChevronRight className="w-3 h-3" />
      <Link to="/dashboard" className="hover:text-gold">Dashboard</Link>
      {c && (
        <>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/${c.slug}/overview`} className="hover:text-gold">{c.label}</Link>
        </>
      )}
      {s && (
        <>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gold">{s.label}</span>
        </>
      )}
    </nav>
  );
}

export function ClusterShell({ children }: { children: ReactNode }) {
  const { cluster = "", sub } = useParams();
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <SiteNav />
      <SidebarProvider>
        <div className="flex w-full pt-16 min-h-[calc(100vh-4rem)]">
          <ClusterSidebar clusterSlug={cluster} />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="sticky top-16 z-30 bg-paper/90 backdrop-blur-md border-b border-border">
              <div className="flex items-center gap-3 px-4 md:px-8 h-12">
                <SidebarTrigger className="text-ink-soft hover:text-gold" />
                <Breadcrumbs cluster={cluster} sub={sub} />
              </div>
            </div>
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </SidebarProvider>
      <SiteFooter />
    </div>
  );
}