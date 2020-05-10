export interface Movie {
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Plot: string;
    Poster: string;
    Ratings: Rating[];
    Type: string;
    UserUID: string;
    fav: boolean;
    seen: boolean;
}

export interface Rating {
    Source: string;
    Value: string;
}