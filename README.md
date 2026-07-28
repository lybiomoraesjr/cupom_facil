# 🍽️ Cupom Fácil — Restaurante Doce Lar

**Cupom Fácil** é um sistema leve, moderno e 100% *Client-Side* (rodando inteiramente no navegador, sem necessidade de servidor ou banco de dados) desenvolvido especialmente para o **Restaurante Doce Lar** (Camanducaia - MG).

O projeto destina-se ao lançamento ágil de pedidos no caixa e emissão automática de comandas formatadas para impressoras térmicas de **80mm (POS-80)**.

---

## 🚀 Funcionalidades

- **Modalidades de Pedido**:
  - **Delivery**: Taxa de entrega automática (com ajuste manual) e validação de campos obrigatórios de endereço (Nome, Rua, Bairro, Número, etc.).
  - **Retirada / Balcão**: Oculta taxa de entrega e endereço de entrega.
  - **Mesa / Local**: Suporte a campo **Número da Mesa** (ex: *Mesa 05*), opções exclusivas de prato (*Prato Feito* e *Comercial*) e caixa opcional para identificação do cliente.

- **Lançamento de Marmitex**:
  - Seleção por tamanho: **P** (R$ 25,00), **M** (R$ 29,00) e **G** (R$ 34,00).
  - Cardápio fixo de misturas.
  - Inclusão automática dos acompanhamentos padrão e tratamento inteligente de exceções (ex: *Feijoada*, *Filé à Parmegiana*, etc.).
  - Campo para observações individuais por item (ex: *"Sem cebola"*, *"Com talheres"*).

- **Produtos Personalizados**:
  - Adição de bebidas ou acompanhamentos avulsos com cálculo automático do **Valor Total** (`Quantidade × Preço Unitário`) em tempo real.

- **Dados para Reembolso Corporativo & Autopreenchimento de CNPJ**:
  - Inclusão opcional de **CNPJ da Empresa** e **Razão Social / Nome da Empresa** para clientes que precisam de comprovante corporativo.
  - **Consulta Automática via BrasilAPI**: Ao digitar os 14 dígitos do CNPJ, o sistema busca e preenche automaticamente a Razão Social da empresa.
  - Os dados da empresa são exibidos no cupom impresso apenas quando ativados e preenchidos.

- **Pagamento e Totais Inteligentes**:
  - Seleção de forma de pagamento (Dinheiro com campo de troco, Cartão, PIX) e status (*A Receber* vs *Já Pago*), mantidos visíveis em todas as modalidades.
  - Exibição de **Taxa de Entrega** e **Subtotal** apenas na modalidade *Delivery*. Nas modalidades *Balcão* e *Local*, a taxa e o subtotal são ocultados na tela e no cupom para uma visualização limpa do **Total**.

- **Impressão Térmica de Comandas (80mm)**:
  - Layout otimizado via CSS `@media print` para papel térmico POS-80 (80mm).
  - Cabeçalho oficial com nome, CNPJ e endereço completo do restaurante: `R. Cedro, 1545 - Lavapés, Camanducaia - MG, 37650-000`.
  - Logotipo centralizado em alta resolução P&B no rodapé.
  - Aviso legal no rodapé: `--- ESTE NÃO É UM CUPOM FISCAL ---`.

- **Gestão de Fluxo no Caixa**:
  - Botão **Novo Pedido** com caixa de confirmação e limpeza automática de todos os campos do formulário para o próximo atendimento.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e formulários de cadastro.
- **Tailwind CSS (via CDN)**: Estilização moderna, limpa e responsiva.
- **JavaScript (ES6+)**: Lógica da aplicação, manipulação do DOM, requisições de API (`fetch`), cálculos em tempo real e preparação de impressão nativa (`window.print()`).
- **BrasilAPI**: Integração pública e gratuita para consulta de CNPJ.

---

## 📂 Estrutura do Projeto

```text
cupom_facil/
├── index.html       # Interface do caixa e layout do cupom térmico
├── js/
│   ├── data.js      # Cardápio, tabela de preços e regras de acompanhamento
│   └── app.js       # Gerenciamento do carrinho, totais, validações, consulta CNPJ e eventos
├── assets/
│   └── logo.png     # Logotipo oficial em P&B para impressão
└── README.md        # Documentação do projeto
```

---

## 💻 Como Executar

Por ser uma aplicação 100% estática (*Client-Side*):

1. Abra o arquivo `index.html` em qualquer navegador web (Google Chrome, Firefox, Edge, Safari, etc.).
2. Nenhuma instalação de pacotes ou inicialização de servidor backend é necessária.

---

## 🏢 Sobre

Desenvolvido para atender o lançamento de pedidos e gestão de caixa do **Restaurante Doce Lar — Camanducaia/MG**.
