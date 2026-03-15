export type FieldType = "TEXT" | "LONG_TEXT" | "NUMBER" | "CURRENCY" | "PERCENT" | "BOOLEAN" | "DATE" | "DATETIME" | "TIME" | "SELECT" | "MULTI_SELECT" | "RELATION" | "USER" | "FILE" | "URL" | "EMAIL" | "PHONE" | "FORMULA" | "STATUS" | "RATING" | "AUTO_NUMBER" | "CREATED_AT" | "UPDATED_AT" | "CREATED_BY" | "UPDATED_BY" | "JSON";
export type ViewType = "TABLE" | "KANBAN" | "CALENDAR" | "TIMELINE" | "GALLERY" | "LIST" | "CHART";
export interface DatabaseDto {
    id: string;
    workspaceId: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface FieldDto {
    id: string;
    databaseId: string;
    name: string;
    slug: string;
    type: FieldType;
    required: boolean;
    unique: boolean;
    primary: boolean;
    order: number;
    defaultValue?: any;
    settings: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
export interface SelectOption {
    id: string;
    label: string;
    color?: string;
}
export interface RecordDto {
    id: string;
    databaseId: string;
    values: Record<string, any>;
    createdById?: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateRecordRequest {
    values: Record<string, any>;
}
export interface UpdateRecordRequest {
    values: Record<string, any>;
}
export interface QueryRecordsRequest {
    page?: number;
    pageSize?: number;
    search?: string;
    filters?: FilterGroup;
    sorts?: ViewSort[];
    groupBy?: string;
    selectedFields?: string[];
}
export interface FilterGroup {
    id?: string;
    operator: "AND" | "OR";
    conditions: FilterCondition[];
    children?: FilterGroup[];
}
export interface FilterCondition {
    fieldId: string;
    operator: string;
    value?: any;
}
export interface ViewSort {
    fieldId: string;
    direction: "asc" | "desc";
}
export interface ViewDto {
    id: string;
    databaseId: string;
    name: string;
    type: ViewType;
    order: number;
    config: Record<string, any>;
    isLocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
