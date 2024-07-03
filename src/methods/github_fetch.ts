import type { OsLinks } from "../types/os_links.ts";
import type { GithubResult } from "../types/github_result.ts";

export interface Author {
  avatar_url: string;
  url: string;
  type: string;
  site_admin: boolean;
}

export interface Uploader extends Author { }

export interface Asset {
  url: string;
  id: number;
  node_id: string;
  name: string;
  label: string | null;
  uploader: Uploader;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

export interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: Author;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: Asset[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}




/**
 * Get the lastest release assets
 * from Github api.
 * */
export default async function getGithubReleases(): Promise<GithubResult | null> {
  const data = await fetch(import.meta.env.ENDPOINT, {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${import.meta.env.GH_APIKEY}`,
      "X-GitHub-Api-Version": "2022-11-28"
    },
  }).then(async (data) => {
    if (!data.ok) {
      console.error(`Error: ${data.statusText}`);
      return null;
    }

    if (!data.ok) {
      console.error(`Error: ${data.statusText}`);
      return null;
    }

    const result: Release[] = await data.json();

    if (!Array.isArray(result) || result.length === 0 || !result[0].assets) {
      console.error("Unexpected data structure:", result);
      return null;
    }

    const dataList: Asset[] = result[0].assets;

    let winUrl: string = "";
    let macUrl: string = "";
    let linUrl: string = "";

    dataList.forEach(item => {
      if (item.name.includes("Windows")) {
        winUrl = item.browser_download_url;
      }
      if (item.name.includes("Mac")) {
        macUrl = item.browser_download_url;
      }
      if (item.name.includes("Linux")) {
        linUrl = item.browser_download_url;
      }
    });
    const links: OsLinks = {
      win: winUrl,
      mac: macUrl,
      lin: linUrl
    };

    const resultData: GithubResult = {
      data: result[0],
      assets: links,
    }

    return resultData;
  });
  return data;
}
