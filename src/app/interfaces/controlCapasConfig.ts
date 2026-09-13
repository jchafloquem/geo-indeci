import { LayerItem, Section, SubSection } from './geoLayers';

/* ------------------------------------------------------------------------- */
/*  Fábricas declarativas                                                     */
/* ------------------------------------------------------------------------- */

/** Propiedades opcionales al declarar una capa (lo omitido toma el valor por defecto). */
type CapaOpciones = Partial<Pick<LayerItem, 'visible' | 'opacity' | 'showInLegend' | 'disabled' | 'requiresAuth'>>;

/**
 * Crea una capa del panel aplicando los valores por defecto
 * (`visible: false`, `opacity: 1`, `showInLegend: false`), de modo que cada
 * entrada solo declara aquello que se desvía del estándar.
 *
 * Las capas sin `id` (sin servicio WMS asociado, típicamente marcadas como
 * "(Desarrollo)") se declaran automáticamente como `disabled`, mostrándose
 * bloqueadas en el panel.
 */
const capa = (id: string, label: string, opciones: CapaOpciones = {}): LayerItem => ({
  type: 'layer',
  id,
  label,
  visible: false,
  opacity: 1,
  showInLegend: false,
  disabled: id === '',
  ...opciones,
});

/** Crea una subsección plegable con sus capas. */
const subseccion = (
  id: string,
  title: string,
  layers: LayerItem[],
  expanded = false,
  opciones: Partial<Pick<SubSection, 'requiresAuth' | 'subtitle'>> = {}
): SubSection => ({
  type: 'subsection',
  id,
  title,
  expanded,
  layers,
  ...opciones,
});

/* ------------------------------------------------------------------------- */
/*  Política de acceso (integración con AuthService)                          */
/* ------------------------------------------------------------------------- */

/**
 * Por defecto, TODAS las secciones del panel requieren sesión iniciada
 * (`requiresAuth`; ver `MapService.panelSections`). Si una sección debe verse
 * también sin autenticar, añade su `id` aquí y quedará exenta automáticamente.
 * Para casos finos (una capa o subsección concreta) usa `requiresAuth` en el item.
 */
const SECCIONES_PUBLICAS: ReadonlySet<string> = new Set<string>([
  // Cartografía base: todas sus capas son visibles por defecto y deben poder
  // controlarse desde el panel también en modo público (sin sesión iniciada).
  'monitoreo',
  'infraestructura',
  'historica',
]);

/** Marca como restringidas todas las secciones que no estén exentas en `SECCIONES_PUBLICAS`. */
const aplicarPoliticaAcceso = (secciones: Section[]): Section[] =>
  secciones.map(s => (SECCIONES_PUBLICAS.has(s.id) ? s : { ...s, requiresAuth: true }));

/* ------------------------------------------------------------------------- */
/*  Estructura del panel (sin política de acceso; se aplica al final)          */
/* ------------------------------------------------------------------------- */

const PANEL_BASE: Section[] = [
  {
    id: 'monitoreo',
    title: 'MONITOREO',
    expanded: false,
    items: [
      /*Capas de referencia externo (INEI)*/
      subseccion('capas_referencia', 'CAPAS DE REFERENCIA', [
        capa('', 'Departamentos INEI', { visible: true, showInLegend: true }),
      ], true),
    ],
  },
  {
    id: 'infraestructura',
    title: 'INFRAESTRUCTURA PARA LA ATENCIÓN DE EMERGENCIAS',
    expanded: false,
    items: [
      /*Capas de referencia externo (INEI)*/
      subseccion('capas_referencia', 'CAPAS DE REFERENCIA', [
        capa('', 'Departamentos INEI', { visible: true, showInLegend: true }),
      ], true),
    ],
  },
    {
    id: 'historica',
    title: 'INFORMACIÓN HISTÓRICA',
    expanded: false,
    items: [
      /*Capas de referencia externo (INEI)*/
      subseccion('capas_referencia', 'CAPAS DE REFERENCIA', [
        capa('', 'Departamentos INEI', { visible: true, showInLegend: true }),
      ], true),
    ],
  },
];
/**
 * Configuración centralizada para las secciones y capas del panel lateral.
 * Este array define la estructura completa del panel de capas, facilitando
 * su mantenimiento y modificación sin alterar la lógica del `MapService`.
 */
export const LAYER_PANEL_SECTIONS: Section[] = aplicarPoliticaAcceso(PANEL_BASE);

