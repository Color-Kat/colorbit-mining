export interface IPaginator<T>{
    data: Array<T>;
    total: number;
    current_page: number;
    from: number;
    last_page: number;
    first_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page_url: string;
    per_page: number;
    to: number;
    links: {
        active: boolean,
        label: string,
        url: string,
    }[];
}
