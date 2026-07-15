export interface GithubStats {
  username: string;
  avatar_url: string | null;
  profile_url: string | null;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  top_repositories: GithubRepo[];
}

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
}
