import { WmsLayerConfig } from './geoLayers';
import { environment } from '../../environments/environment';

const wp = environment.geoserver.workspacePrefix;
/**
 * Grupos de configuración de capas WMS organizados por temática.
 */
const ETIQUETAS_LAYERS: WmsLayerConfig[] = [
  { id: '', layerName: `${wp}vw_tg_lote_urbano`, zIndex: 1, title: 'Lote Urbano' },
];














