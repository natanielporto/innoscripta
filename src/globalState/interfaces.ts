export interface TheNewsProps { 
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id?: string;
    name: string;
  },
  title: string;
  url: string;
  urlToImage?: string;
}

export interface NytProps {
  abstract: string;
  adx_keywords: string;
  asset_id: number;
  byline: string;
  column: string | null;
  des_facet: string[];
  eta_id: number;
  geo_facet: string[];
  id: number;
  media: {
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
    approved_for_syndication: number;
  }[];
  nytdsection: string;
  org_facet: string[];
  per_facet: string[];
  published_date: string;
  section: string;
  source: string;
  subsection: string;
  title: string;
  type: string;
  updated: string;
  uri: string;
  url: string;
}

export interface TheGuardianProps {
  apiUrl: string;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}

export type CombinedNewsProps = TheNewsProps & NytProps & TheGuardianProps