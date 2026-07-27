# 🍽️ Pedido Fácil — Restaurante Doce Lar

Sistema leve, moderno e 100% *Client-Side* (rodando inteiramente no navegador, sem necessidade de servidor ou banco de dados) desenvolvido especialmente para o **Restaurante Doce Lar** (Camanducaia).

O projeto destina-se ao lançamento ágil de pedidos no caixa e emissão automática de comandas formatadas para impressoras térmicas de **80mm (POS-80)**.

---

## 🚀 Funcionalidades

- **Modalidades de Pedido**:
  - **Delivery**: Taxa de entrega automática (com ajuste manual) e validação de campos obrigatórios de endereço (Nome, Rua, Bairro, Número, etc.).
  - **Retirada / Balcão**: Para clientes que buscam no balcão (sem taxa de entrega).
  - **Mesa / Local**: Para consumo no restaurante, com opções exclusivas de *Prato Feito* e *Comercial*.

- **Lançamento de Marmitex**:
  - Seleção por tamanho: **P** (R$ 25,00), **M** (R$ 29,00) e **G** (R$ 34,00).
  - Cardápio fixo de misturas.
  - Inclusão automática dos acompanhamentos padrão e tratamento inteligente de exceções (ex: *Feijoada*, *Filé à Parmegiana*, etc.).
  - Campo para observações individuais por item (ex: *"Sem cebola"*, *"Com talheres"*).

- **Produtos Personalizados**:
  - Adição de bebidas ou acompanhamentos avulsos com cálculo automático do **Valor Total** (`Quantidade × Preço Unitário`) em tempo real.

- **Pagamento e Totais**:
  - Seleção de forma de pagamento (Dinheiro com troco, Cartão, PIX).
  - Status do pagamento (*A Receber* vs *Já Pago*).
  - Atualização automática de subtotal, taxa de entrega e valor a cobrar.

- **Impressão Térmica de Comandas (80mm)**:
  - Layout otimizado via CSS `@media print` para papel térmico POS-80 (80mm).
  - Ocultação dos controles do caixa durante a impressão.
  - Logotipo em alta resolução preto e branco no rodapé.
  - Aviso legal no rodapé: `--- ESTE NÃO É UM CUPOM FISCAL ---`.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e formulários de cadastro.
- **Tailwind CSS (via CDN)**: Estilização moderna, limpa e responsiva.
- **JavaScript (ES6+)**: Lógica da aplicação, manipulação do DOM, cálculos em tempo real e preparação de impressão nativa (`window.print()`).

---

## 📂 Estrutura do Projeto

```text
pedido_facil/
├── index.html       # Interface do caixa e layout do cupom térmico
├── js/
│   ├── data.js      # Cardápio, tabela de preços e regras de acompanhamento
│   └── app.js       # Gerenciamento do carrinho, totais, validações e eventos
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

Desenvolvido para atender o lançamento de pedidos e gestão de caixa do **Restaurante Doce Lar — Camanducaia**.
