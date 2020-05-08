export interface Movie {
    id: string;
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Plot: string;
    Poster: string;
    Ratings: Rating[];
    Type: string;
}

export interface Rating {
    Source: string;
    Value: string;
}