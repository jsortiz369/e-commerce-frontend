import { Aria, Translation } from 'primeng/api';

type PrimeNGArrayKey = 'fileSizeTypes' | 'dayNames' | 'dayNamesShort' | 'dayNamesMin' | 'monthNames' | 'monthNamesShort';

type PrimeNGStringKey = keyof Omit<Translation, 'aria' | PrimeNGArrayKey | 'firstDayOfWeek'>;

/**
 * Al usar `Record<Key, true>` en lugar de un array `Key[]`, TypeScript garantiza en tiempo de compilación:
 * 1. Que NO se puedan agregar llaves duplicadas (TS1117: An object literal cannot have multiple properties with the same name).
 * 2. Que NO falte ninguna propiedad de la interfaz `Translation` / `Aria` de PrimeNG.
 */
const PRIMENG_STRING_KEY_MAP = {
  startsWith: true,
  contains: true,
  notContains: true,
  endsWith: true,
  equals: true,
  notEquals: true,
  noFilter: true,
  lt: true,
  lte: true,
  gt: true,
  gte: true,
  is: true,
  isNot: true,
  before: true,
  after: true,
  dateIs: true,
  dateIsNot: true,
  dateBefore: true,
  dateAfter: true,
  clear: true,
  apply: true,
  matchAll: true,
  matchAny: true,
  addRule: true,
  removeRule: true,
  accept: true,
  reject: true,
  choose: true,
  upload: true,
  cancel: true,
  completed: true,
  pending: true,
  dateFormat: true,
  today: true,
  weekHeader: true,
  weak: true,
  medium: true,
  strong: true,
  passwordPrompt: true,
  emptyMessage: true,
  emptyFilterMessage: true,
  fileChosenMessage: true,
  noFileChosenMessage: true,
  chooseYear: true,
  chooseMonth: true,
  chooseDate: true,
  prevDecade: true,
  nextDecade: true,
  prevYear: true,
  nextYear: true,
  prevMonth: true,
  nextMonth: true,
  prevHour: true,
  nextHour: true,
  prevMinute: true,
  nextMinute: true,
  prevSecond: true,
  nextSecond: true,
  am: true,
  pm: true,
  searchMessage: true,
  selectionMessage: true,
  emptySelectionMessage: true,
  emptySearchMessage: true,
} satisfies Record<PrimeNGStringKey, true>;

const PRIMENG_ARRAY_KEY_MAP = {
  fileSizeTypes: true,
  dayNames: true,
  dayNamesShort: true,
  dayNamesMin: true,
  monthNames: true,
  monthNamesShort: true,
} satisfies Record<PrimeNGArrayKey, true>;

const PRIMENG_ARIA_KEY_MAP = {
  trueLabel: true,
  falseLabel: true,
  nullLabel: true,
  star: true,
  stars: true,
  selectAll: true,
  unselectAll: true,
  close: true,
  previous: true,
  next: true,
  navigation: true,
  scrollTop: true,
  moveTop: true,
  moveUp: true,
  moveDown: true,
  moveBottom: true,
  moveToTarget: true,
  moveToSource: true,
  moveAllToTarget: true,
  moveAllToSource: true,
  pageLabel: true,
  firstPageLabel: true,
  lastPageLabel: true,
  nextPageLabel: true,
  prevPageLabel: true,
  rowsPerPageLabel: true,
  previousPageLabel: true,
  jumpToPageDropdownLabel: true,
  jumpToPageInputLabel: true,
  selectRow: true,
  unselectRow: true,
  expandRow: true,
  collapseRow: true,
  expand: true,
  collapse: true,
  showFilterMenu: true,
  hideFilterMenu: true,
  filter: true,
  filterOperator: true,
  filterConstraint: true,
  editRow: true,
  saveEdit: true,
  cancelEdit: true,
  listView: true,
  gridView: true,
  slide: true,
  slideNumber: true,
  zoomImage: true,
  zoomIn: true,
  zoomOut: true,
  rotateRight: true,
  rotateLeft: true,
  listLabel: true,
  selectColor: true,
  removeLabel: true,
  browseFiles: true,
  maximizeLabel: true,
  minimizeLabel: true,
} satisfies Record<keyof Aria, true>;

const PRIMENG_STRING_KEYS = new Set(Object.keys(PRIMENG_STRING_KEY_MAP) as PrimeNGStringKey[]);
const PRIMENG_ARRAY_KEYS = new Set(Object.keys(PRIMENG_ARRAY_KEY_MAP) as PrimeNGArrayKey[]);
const PRIMENG_ARIA_KEYS = new Set(Object.keys(PRIMENG_ARIA_KEY_MAP) as (keyof Aria)[]);

/**
 * Construye dinámicamente el objeto `Translation` de PrimeNG a partir de las llaves
 * `primeng.*` y `primeng.aria.*` que vienen en la respuesta HTTP (`static-translations.json` o backend).
 */
export function buildPrimeNGTranslation(dictionary: Record<string, string> = {}): Translation {
  const aria: Aria = {};

  for (const ariaKey of PRIMENG_ARIA_KEYS) {
    const val = dictionary[`primeng.aria.${ariaKey}`];
    if (typeof val === 'string' && val.length > 0) {
      aria[ariaKey] = val;
    }
  }

  const result: Translation = { aria };

  for (const key of PRIMENG_STRING_KEYS) {
    const val = dictionary[`primeng.${key}`];
    if (typeof val === 'string' && val.length > 0) {
      result[key] = val;
    }
  }

  for (const key of PRIMENG_ARRAY_KEYS) {
    const val = dictionary[`primeng.${key}`];
    if (typeof val === 'string' && val.length > 0) {
      result[key] = val.split(',').map((item) => item.trim());
    }
  }

  const firstDayRaw = dictionary['primeng.firstDayOfWeek'];
  if (firstDayRaw !== undefined && !Number.isNaN(Number(firstDayRaw))) {
    result.firstDayOfWeek = Number(firstDayRaw);
  }

  return result;
}
