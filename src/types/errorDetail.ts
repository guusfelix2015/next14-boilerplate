export interface ErrorDetail {
    title: string;
    detail: string;
    code: string;
    type?: string;
    extra?: Record<string, unknown>;
}
