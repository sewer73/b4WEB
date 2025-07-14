export interface Travel {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  group_size: string;
  activity: string;
  category?: Category;
  likes: number;
  isLiked: boolean;
  imgUrl: string;
}

export enum Category {
  TREKKING = "TREKKING",
  TREKKING_4000M_PLUS = "Trekking >4.000m",
  TREKKING_4000M_MINUS = "Trekking <4.000m",
  TREKKING_CULTURA = "Trekking & Cultura",
  SKI = "SKI",
  SKI_MONTAÑA = "Ski Montaña",
  SKI_FREERIDE = "Ski Freeride",
  SKI_HELISKI = "Ski Heliski",
  SKI_SNOWCAT = "Ski Snowcat",
  SKI_MOTO_NIEVE = "Ski Moto de nieve",
  SKI_RESORT_ALPINO = "Ski Resort/Alpino",
  SKI_VELERO = "Ski & Velero",
  ALPINISMO = "ALPINISMO",
  ALPINISMO_EXPEDICION = "Alpinismo Expedición",
  ALPINISMO_TECNICO = "Alpinismo Técnico",
  ALPINISMO_NO_TECNICO = "Alpinismo no Técnico",
  NAVEGACION = "NAVEGACIÓN",
  NAVEGACION_OCEANICA = "Navegación oceánica",
  NAVEGACION_ARTICA = "Navegación ártica",
  NAVEGACION_FAMILIA = "Navegación família y amigos",
  NAVEGACION_SENDERISMO = "Navegación & senderismo",
  NAVEGACION_ESCALADA = "Navegación & escalada",
  TURISMO = "TURISMO",
  TURISMO_CULTURA = "Turismo & Cultura",
  TURISMO_NATURALEZA = "Turismo & Naturaleza",
  TRAIL_RUNNING = "TRAIL RUNNING",
  FOTOGRAFIA = "FOTOGRAFÍA",
  ESCALADA = "ESCALADA",
  ESCALADA_ROCA = "Escalada de roca",
  ESCALADA_HIELO = "Escalada en hielo",
}

export enum ActivityType {
  ADVENTURE = "adventure",
  CULTURAL = "cultural",
  RELAXATION = "relaxation",
  NATURE = "nature",
  URBAN = "urban",
}

export enum SortOption {
  BEST_RATED = "Best rated",
  LOWEST_PRICE = "Lowest price",
  HIGHEST_PRICE = "Highest price",
}