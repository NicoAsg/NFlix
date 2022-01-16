export interface APIMedia {
    id: string,
    title: string,
    originalTitle: string | undefined,
    type: string,
    year: string,
    image: string,
    plot: string,
    genres: string,
    trailer: { linkEmbed: string },
    wikipedia : { titleInLanguage: string | undefined },
    tvSeriesInfo: { seasons: Array<string> }
}