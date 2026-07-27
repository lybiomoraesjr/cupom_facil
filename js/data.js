const PRECOS = {
    'P': 25.00,
    'M': 29.00,
    'G': 34.00,
};

const PRECOS_LOCAL = {
    'Prato Feito': 25.00,
    'Comercial': 29.00,
};

const ACOMPANHAMENTOS_BASE = "Arroz, feijão, macarrão alho e óleo, farofa da casa, ovo frito e salada fresca.";

const MISTURAS_OPCOES = {
    CARNE_DE_PANELA: "Carne de panela c/ batata",
    FILE_DE_FRANGO: "Filé de frango grelhado",
    LINGUICA_TOSCANA: "Linguiça toscana acebolada",
    LINGUICA_CALABRESA: "Linguiça calabresa acebolada",
    CONTRAFILE: "Contrafilé acebolado",
    PICANHA_PORCO: "Picanha de porco acebolada",
    TILAPIA_PEDACOS: "Filé de tilápia em pedaços",
    PARMEGIANA_FRANGO: "Filé de frango à parmegiana",
    FEIJOADA: "Feijoada completa",
    COXA_SOBRECOXA: "Coxa e sobrecoxa assadas c/ batata",
    TILAPIA_PURE: "Filé de tilápia em pedaços c/ purê de batata",
};

const MISTURAS = Object.values(MISTURAS_OPCOES);

const REGRAS_EXCECAO_ACOMPANHAMENTO = {
    [MISTURAS_OPCOES.FEIJOADA]: "Acompanha arroz, farofa da casa, ovo frito, vinagrete, torresmo e couve.",
    [MISTURAS_OPCOES.CARNE_DE_PANELA]: "Não acompanha batata frita.",
    [MISTURAS_OPCOES.COXA_SOBRECOXA]: "Não acompanha batata frita.",
    [MISTURAS_OPCOES.PARMEGIANA_FRANGO]: "Não acompanha ovo frito.",
    [MISTURAS_OPCOES.TILAPIA_PURE]: "Não acompanha batata frita e ovo",
};
