import { Pipe, PipeTransform } from '@angular/core';

export type DateFormat = 'date' | 'time' | 'datetime' | 'shortDate' | 'shortTime';

@Pipe({
  name: 'localizedDate',
})
export class LocalizedDatePipe implements PipeTransform {
  private readonly defaultLocale = navigator.language || 'es-CO';
  private readonly defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Bogota';

  private readonly formats: Record<DateFormat, Intl.DateTimeFormatOptions> = {
    date: { day: '2-digit', month: '2-digit', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    shortDate: { day: '2-digit', month: '2-digit' },
    shortTime: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
  };

  transform(value: string | Date | null | undefined, format: DateFormat = 'datetime', locale: string = this.defaultLocale): string | null {
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    const supportedLocale = Intl.DateTimeFormat.supportedLocalesOf([locale]).length ? locale : this.defaultLocale;

    return new Intl.DateTimeFormat(supportedLocale, {
      ...this.formats[format],
      timeZone: this.defaultTimeZone,
    }).format(date);
  }
}
