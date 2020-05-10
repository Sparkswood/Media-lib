export interface Series {
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Plot: string;
    Poster: string;
    Ratings: Rating[];
    totalSeasons: string;
    Type: string;
    UserUID: string;
    fav: boolean;
    seen: boolean;
}

export interface Rating {
    Source: string;
    Value: string;
}