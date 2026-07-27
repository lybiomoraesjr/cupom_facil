Aqui está a documentação de requisitos em Markdown para o sistema do **Restaurante Doce Lar**, estruturada para orientar o desenvolvimento sem backend (frontend estático com HTML, CSS e JavaScript).

---

# Documentação de Requisitos — Sistema de Caixa Doce Lar

## 1. Visão Geral do Projeto

O objetivo deste projeto é fornecer uma interface web simples, leve e sem necessidade de servidor (100% Client-Side) para lançamento de pedidos e emissão de comanda/nota para impressora térmica de **80mm (POS-80)**. A interface é estilizada com **Tailwind CSS**.

---

## 2. Requisitos Funcionais (RF)

### RF-01: Cadastro e Seleção de Pedidos

*   **RF-01.1:** O sistema deve permitir selecionar a modalidade do pedido, com *Delivery* sendo a opção padrão:
    *   *Delivery* (Com taxa de entrega e endereço)
    *   *Retirada / Balcão* (Sem taxa de entrega)
    *   *Mesa / Local* (Sem dados do cliente)
*   **RF-01.2:** O sistema deve permitir adicionar Marmitex pelos tamanhos:
    *   **P:** R$ 25,00
    *   **M:** R$ 29,00
    *   **G:** R$ 34,00
*   **RF-01.3:** O sistema deve exibir a lista completa de misturas disponíveis, independentemente do dia da semana.
*   **RF-01.4:** O sistema deve permitir adicionar observações por item de marmitex (ex: *"Sem cebola"*, *"Com talheres"*).
*   **RF-01.5:** O sistema deve possuir uma seção para "Produto Personalizado", permitindo adicionar itens avulsos (ex: refrigerantes) com:
    *   Quantidade
    *   Nome do Produto
    *   Preço Unitário

### RF-02: Gerenciamento de Taxa de Entrega

*   **RF-02.1:** Para a modalidade *Delivery*, a taxa de entrega deve ser preenchida automaticamente com o valor padrão de **R$ 5,00**.
*   **RF-02.2:** O campo da taxa de entrega é um input manual, permitindo que o valor padrão seja alterado para atender outras localidades (ex: Zona Rural).

### RF-03: Dados do Cliente

*   **RF-03.1:** Para pedidos de *Delivery* e *Retirada*, o sistema deve permitir preencher os dados do cliente.
*   **RF-03.2:** Para a modalidade *Delivery*, o formulário de endereço deve ser detalhado:
    *   CEP (com função de busca de endereço via API ViaCEP)
    *   Rua
    *   Número
    *   Bairro
    *   Complemento
    *   Ponto de Referência
*   **RF-03.3:** O sistema deve capturar o Nome, Telefone e Forma de Pagamento (*Dinheiro com troco, Cartão, PIX*).

### RF-04: Impressão Térmica (POS-80)

*   **RF-04.1:** O sistema deve gerar um layout de cupom formatado para **80mm de largura**.
*   **RF-04.2:** O cupom deve conter o cabeçalho oficial do restaurante:
    *   Nome Fantasia: **RESTAURANTE DOCE LAR CAMANDUCAIA**
    *   CNPJ: **65.172.987/0001-77**
    *   Telefone de contato
*   **RF-04.3:** O cupom deve listar todos os itens (marmitex e personalizados) com detalhes de quantidade, preço, acompanhamentos e observações.
*   **RF-04.4:** O cupom deve exibir no rodapé a imagem da logo do Restaurante Doce Lar e o aviso legal: `--- ESTE NÃO É UM CUPOM FISCAL ---`.
*   **RF-04.5:** O sistema deve utilizar a função nativa `window.print()` estilizada com CSS `@media print` para ocultar os controles da tela na hora de imprimir.

---

## 3. Requisitos Não-Funcionais (RNF)

*   **RNF-01 (Sem Backend):** O sistema deve rodar inteiramente no navegador (HTML5, CSS3 e JavaScript ES6+) sem necessidade de banco de dados ou servidor.
*   **RNF-02 (Funcionamento Offline):** O sistema deve funcionar sem conexão com a internet após o carregamento inicial (exceto a busca de CEP).
*   **RNF-03 (Performance):** A interface deve ser ágil, permitindo fechar um pedido completo em menos de 30 segundos.
*   **RNF-04 (Compatibilidade de Impressão):** O CSS deve garantir margens e fontes legíveis para bobinas de 80mm em impressoras térmicas genéricas.
*   **RNF-05 (Estilização):** A interface deve ser estilizada utilizando o framework **Tailwind CSS** via CDN para uma aparência moderna e responsiva.

---

## 4. Regras de Negócio e Dados Mocados (RN)

### RN-01: Acompanhamentos Base Fixos

*   Todas as marmitex normais devem incluir automaticamente no cupom o texto do acompanhamento base:
    > *"Arroz, feijão, macarrão alho e óleo, farofa da casa, ovo frito e salada fresca."*

### RN-02: Exceções Automáticas de Acompanhamento

*   **Feijoada completa:** Acompanha *arroz, farofa da casa, ovo frito, vinagrete, torresmo e couve*.
*   **Carne de panela c/ batata:** Não acompanha batata frita.
*   **Coxa e sobrecoxa assadas c/ batata:** Não acompanha batata frita.
*   **Filé de frango à parmegiana:** Não acompanha ovo frito.

### RN-03: Cardápio Fixo de Misturas

*   O sistema oferece uma lista fixa de misturas que está sempre disponível para seleção.

### RN-04: Bairros Atendidos (Área Urbana - Taxa Fixa R$ 5,00)

*   A taxa padrão de R$ 5,00 é sugerida para os bairros da área urbana, mas pode ser alterada manualmente.

---

## 5. Estrutura de Arquivos Sugerida

```text
restaurante-docelar/
├── index.html       # Interface do caixa, estrutura da nota e estilos de impressão
├── js/
│   ├── data.js      # Objeto com o cardápio mocado e regras de negócio
│   └── app.js       # Lógica do carrinho, cálculos e evento de impressão
└── assets/
    └── logo.png     # Logo oficial do restaurante

```