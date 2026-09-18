import { getCollection, type CollectionEntry } from "astro:content";

// Selection and ordering live here once; every page asks this module.
export const FEATURED_COUNT = 3;
export const PROJECT_PAGES_ENABLED = true;

export type Project = CollectionEntry<"projects">;

// Every link to a project goes through this, so switching from gallery anchors
// to project pages is one change. The page URL uses the opaque slug; the
// gallery anchor stays the readable folder id.
export const projectHref = (project: Project) =>
  PROJECT_PAGES_ENABLED
    ? `/websites/gallery/${project.data.slug}`
    : `/websites/gallery#${project.id}`;

export async function getGalleryProjects(): Promise<Project[]> {
  const all = await getCollection("projects", (p) => p.data.status !== "archived");
  return all.sort((a, b) => {
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    if (a.data.status !== b.data.status) return a.data.status === "live" ? -1 : 1;
    return (b.data.launchedAt?.getTime() ?? 0) - (a.data.launchedAt?.getTime() ?? 0);
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getGalleryProjects())
    .filter((p) => p.data.featured)
    .slice(0, FEATURED_COUNT);
}
