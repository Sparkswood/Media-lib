export interface Series {
    id: string;
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Plot: string;
    Poster: string;
    Ratings: Rating[];
    totalSeasons: string;
    Type: string;
}

export interface Rating {
    Source: string;
    Value: string;
}