

export interface PostSectionData {
    section_headline: string;
    content: string;
    list: string[];
}

export interface PostContent {
    title: string;
    description: string;
    imageUrl: string;
    sections: PostSectionData[];
}

export interface ArticlePreviewData {
    description: string;
    createdAt: string;
    title: string;
    path: string;
    imageUrl: string | null;
}