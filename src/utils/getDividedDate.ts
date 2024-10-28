export function getDividedDate(date_instance: Date): string[] {
    const date_only = date_instance.toISOString().split("T")[0];
    const time_only = date_instance.toTimeString().split(" ")[0].slice(0, 5);

    return [date_only, time_only];
}