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

const MISTURAS = [
    "Carne de panela c/ batata",
    "Filé de frango grelhado",
    "Linguiça toscana acebolada",
    "Linguiça calabresa acebolada",
    "Contrafilé acebolado",
    "Picanha de porco acebolada",
    "Filé de tilápia em pedaços",
    "Filé de frango à parmegiana",
    "Feijoada completa",
    "Coxa e sobrecoxa assadas c/ batata"
];

const REGRAS_EXCECAO_ACOMPANHAMENTO = {
    "Feijoada completa": "Acompanha arroz, farofa da casa, ovo frito, vinagrete, torresmo e couve.",
    "Carne de panela c/ batata": "Não acompanha batata frita.",
    "Coxa e sobrecoxa assadas c/ batata": "Não acompanha batata frita.",
    "Filé de frango à parmegiana": "Não acompanha ovo frito."
};