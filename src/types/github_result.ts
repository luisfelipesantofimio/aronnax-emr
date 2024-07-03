import type { Release } from "../methods/github_fetch"
import type { OsLinks } from "../types/os_links"

export interface GithubResult {
  data: Release;
  assets: OsLinks;
}
