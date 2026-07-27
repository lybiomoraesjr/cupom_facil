Aqui está a documentação de requisitos em Markdown para o sistema do **Restaurante Doce Lar**, estruturada para orientar o desenvolvimento sem backend (frontend estático com HTML, CSS e JavaScript).

---

# Documentação de Requisitos — Sistema de Caixa Doce Lar

## 1. Visão Geral do Projeto

O objetivo deste projeto é fornecer uma interface web simples, leve e sem necessidade de servidor (100% Client-Side) para lançamento de pedidos e emissão de comanda/nota para impressora térmica de **80mm (POS-80)**.

---

## 2. Requisitos Funcionais (RF)

### RF-01: Cadastro e Seleção de Pedidos

* **RF-01.1:** O sistema deve permitir selecionar a modalidade do pedido:
* *Delivery* (Com taxa de entrega e endereço)
* *Retirada / Balcão* (Sem taxa de entrega)
* *Mesa / Local* (Prato Feito ou Comercial)


* **RF-01.2:** O sistema deve permitir adicionar Marmitex pelos tamanhos:
* **P:** R$ 25,00
* **M:** R$ 29,00
* **G:** R$ 34,00


* **RF-01.3:** Ao selecionar uma Marmitex, o sistema deve exibir a lista de misturas disponíveis para o dia da semana atual.
* **RF-01.4:** O sistema deve permitir adicionar observações por item (ex: *"Sem cebola"*, *"Com talheres"*).

### RF-02: Gerenciamento de Taxa de Entrega

* **RF-02.1:** Botão de atalho para inserção rápida da taxa urbana padrão (**R$ 5,00**).
* **RF-02.2:** Campo de entrada manual para valores de entrega personalizados (para atendimento da Zona Rural).

### RF-03: Dados do Cliente

* **RF-03.1:** Para pedidos de Delivery e Retirada, o sistema deve permitir preencher:
* Nome do cliente
* Endereço completo (Rua, Número, Bairro)
* Ponto de referência
* Telefone de contato
* Forma de pagamento (*Dinheiro com troco, Cartão, PIX*)



### RF-04: Impressão Térmica (POS-80)

* **RF-04.1:** O sistema deve gerar um layout de cupom formatado para **80mm de largura**.
* **RF-04.2:** O cupom deve conter o cabeçalho oficial do restaurante:
* Nome Fantasia: **RESTAURANTE DOCE LAR CAMANDUCAIA**
* CNPJ: **65.172.987/0001-77**
* Endereço e Telefones de contato


* **RF-04.3:** O cupom deve listar os itens detalhados com quantidade, preço unitário, acompanhamentos padrão e observações.
* **RF-04.4:** O cupom deve exibir o rodapé com a imagem da logo do Restaurante Doce Lar e o aviso legal: `--- ESTE NÃO É UM CUPOM FISCAL ---`.
* **RF-04.5:** O sistema deve utilizar a função nativa `window.print()` estilizada com CSS `@media print` para ocultar os controles da tela na hora de imprimir.

### RF-05: Numeração de Pedidos e Persistência

* **RF-05.1:** O sistema deve gerar uma numeração sequencial para cada pedido (ex: `#DL1001`, `#DL1002`).
* **RF-05.2:** O número do último pedido deve ser salvo no `localStorage` do navegador para evitar perda de dados ao recarregar a página.

---

## 3. Requisitos Não-Funcionais (RNF)

* **RNF-01 (Sem Backend):** O sistema deve rodar inteiramente no navegador (HTML5, CSS3 e JavaScript ES6+) sem necessidade de banco de dados SQL/NoSQL ou servidor rodando (Node.js/Python).
* **RNF-02 (Funcionamento Offline):** O sistema deve funcionar perfeitamente sem conexão com a internet após o carregamento inicial.
* **RNF-03 (Performance):** A interface deve ser ágil, permitindo fechar um pedido completo em menos de 30 segundos.
* **RNF-04 (Compatibilidade de Impressão):** O CSS deve garatir margens e fontes legíveis para bobinas de 80mm em impressoras térmicas genéricas POS-80.

---

## 4. Regras de Negócio e Dados Mocados (RN)

### RN-01: Acompanhamentos Base Fixos

* Todas as marmitex normais devem incluir automaticamente no cupom o texto do acompanhamento base:
> *"Arroz, feijão, macarrão alho e óleo, farofa da casa, ovo frito e salada fresca."*



### RN-02: Exceções Automáticas de Acompanhamento

* **Feijoada (Quarta e Sábado):** Acompanha *arroz, farofa da casa, ovo frito, vinagrete, torresmo e couve*. (Remover macarrão, feijão carioca, fritas e salada).
* **Carne de Panela (Segunda) e Coxa/Sobrecoxa (Quinta):** Não acompanham batata frita.
* **Parmegiana (Terça):** Não acompanha ovo frito.

### RN-03: Cronograma Semanal de Misturas

| Dia da Semana | Misturas Liberadas no Sistema |
| --- | --- |
| **Segunda-Feira** | Carne de panela c/ batata, Filé de frango grelhado, Linguiça toscana acebolada, Linguiça calabresa acebolada, Contrafilé acebolado, Picanha de porco acebolada, Filé de tilápia em pedaços. |
| **Terça-Feira** | Contrafilé acebolado, Linguiça calabresa acebolada, Linguiça toscana acebolada, Filé de frango grelhado, Picanha de porco acebolada, Filé de tilápia em pedaços, Filé de frango à parmegiana. |
| **Quarta-Feira** | Filé de frango grelhado, Picanha de porco acebolada, Contrafilé acebolado, Linguiça toscana acebolada, Linguiça calabresa acebolada, Filé de tilápia em pedaços, Feijoada completa. |
| **Quinta-Feira** | Coxa e sobrecoxa assadas c/ batata, Contrafilé acebolado, Linguiça toscana acebolada, Linguiça calabresa acebolada, Picanha de porco acebolada, Filé de frango grelhado, Filé de tilápia em pedaços. |
| **Sexta-Feira** | Contrafilé acebolado, Filé de frango grelhado, Linguiça toscana acebolada, Linguiça calabresa acebolada, Filé de tilápia em pedaços, Picanha de porco acebolada. |
| **Sábado** | Contrafilé acebolado, Filé de frango grelhado, Picanha de porco acebolada, Linguiça calabresa acebolada, Linguiça toscana acebolada, Filé de tilápia em pedaços, Feijoada completa. |

### RN-04: Bairros Atendidos (Área Urbana - Taxa Fixa R$ 5,00)

* Alto Cemitério
* Bairro dos Ipês
* Centro
* Cruzeiro
* Hospital
* Leite Sol
* Mantiqueira
* Quedas Verdes
* São José

---

## 5. Estrutura de Arquivos Sugerida

```text
restaurante-docelar/
├── index.html       # Interface do caixa e estrutura da nota
├── css/
│   └── style.css    # Estilização da tela e regras @media print
├── js/
│   ├── data.js      # Objeto com o cardápio mocado e regras dos dias
│   └── app.js       # Lógica do carrinho, cálculos e evento de impressão
└── assets/
    └── logo.png     # Logo oficial (ou convertida em Base64 dentro do código)

```

