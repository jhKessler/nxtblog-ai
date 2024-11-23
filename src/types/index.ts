

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