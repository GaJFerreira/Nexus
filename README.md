# Documentação do Projeto Nexus

**Versão:** 0.3.1
**Data:** 2025-07-18
**Autor:** Gaj

---

## 1. Visão Geral do Projeto

Este documento detalha o planejamento e a arquitetura para a construção da aplicação web de **gestão financeira pessoal Nexus**. O objetivo é criar um produto de nível profissional, focando em **usabilidade**, **análise de dados** e **segurança**, para servir como um ponto central de conexão para a vida financeira do usuário.

---

## 2. Fase 0: Concepção e Planejamento

### 2.1. Escopo do MVP (Minimum Viable Product)

O escopo foi definido para incluir uma visão gerencial completa das finanças do usuário, traduzido nas seguintes **Histórias de Usuário**:

* **US01 (Autenticação):**
  *Como um usuário, eu quero criar uma conta e fazer login para que meus dados sejam privados e seguros.*

* **US02 (Gestão de Contas):**
  *Como um usuário, eu quero cadastrar minhas contas bancárias e cartões de crédito (com seus respectivos saldos, limites e datas de fatura) para que eu possa centralizar minha vida financeira.*

* **US03 (Gestão de Transações):**
  *Como um usuário logado, eu quero registrar entradas (renda) e saídas (despesas), associando cada uma a uma conta específica.*

* **US04 (Análise de Transações):**
  *Como um usuário logado, eu quero ver uma lista detalhada de todas as minhas transações, com filtros por conta, categoria ou data.*

* **US05 (Gestão de Parcelas):**
  *Como um usuário logado, ao registrar uma compra parcelada no cartão de crédito, eu quero que o sistema gere as despesas futuras automaticamente.*

* **US06 (Dashboard Mensal):**
  *Como um usuário, eu quero ver um painel de controle (dashboard) com um resumo financeiro do meu mês atual, incluindo total de receitas, total de despesas, balanço final e gastos por categoria e por conta.*

* **US07 (Editar/Excluir):**
  *Como um usuário, eu quero editar ou excluir transações e contas para manter meus dados precisos.*

---

### 2.2. Modelagem de Dados (Firestore)

A estrutura de dados no banco NoSQL **Firestore** será organizada nas seguintes **coleções**:

#### 🗂️ Coleção: `users`

| Campo       | Tipo      | Descrição                                              |
| ----------- | --------- | ------------------------------------------------------ |
| `uid`       | string    | ID único fornecido pelo Firebase Auth (Chave Primária) |
| `email`     | string    | E-mail de login do usuário                             |
| `name`      | string    | Nome de exibição do usuário                            |
| `createdAt` | timestamp | Data e hora de criação da conta                        |

---

#### 🗂️ Coleção: `accounts`

| Campo               | Tipo      | Descrição                                                        |
| ------------------- | --------- | ---------------------------------------------------------------- |
| `id`                | string    | ID único do documento                                            |
| `userId`            | string    | `uid` do usuário dono da conta                                   |
| `name`              | string    | Nome personalizado. Ex: "Conta Corrente Itaú", "Cartão Nubank"   |
| `type`              | string    | `'checking'` (corrente), `'savings'` (poupança), `'credit_card'` |
| `balance`           | number    | Saldo atual em centavos (para `checking` e `savings`)            |
| `creditLimit`       | number    | *Opcional.* Limite do cartão em centavos (para `credit_card`)    |
| `invoiceClosingDay` | number    | *Opcional.* Dia do mês que a fatura fecha (para `credit_card`)   |
| `invoiceDueDay`     | number    | *Opcional.* Dia do mês que a fatura vence (para `credit_card`)   |
| `bank`              | string    | *Opcional.* Nome do banco/instituição. Ex: "Itaú", "Nubank"      |
| `createdAt`         | timestamp | Data de criação do registro                                      |

---

#### 🗂️ Coleção: `transactions`

| Campo             | Tipo      | Descrição                                                    |
| ----------------- | --------- | ------------------------------------------------------------ |
| `id`              | string    | ID único do documento                                        |
| `userId`          | string    | `uid` do usuário                                             |
| `accountId`       | string    | ID da conta (`accounts`) de origem/destino da transação      |
| `type`            | string    | `'income'` (receita) ou `'expense'` (despesa)                |
| `description`     | string    | Descrição da transação                                       |
| `amount`          | number    | Valor em centavos (sempre positivo)                          |
| `date`            | timestamp | Data da transação                                            |
| `category`        | string    | Categoria. Ex: "Alimentação", "Salário"                      |
| `isFixed`         | boolean   | `true` se for uma transação recorrente/fixa                  |
| `installmentInfo` | object    | *Opcional.* Ex: `{ parentId: 'xyz', current: 1, total: 12 }` |
| `createdAt`       | timestamp | Data de criação do registro                                  |
| `updatedAt`       | timestamp | Data da última atualização                                   |

---

### 2.3. Arquitetura e Tecnologias

* **Framework:** Next.js (com App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Backend & DB:** Firebase (Authentication, Firestore, Hosting)
* **Testes:** Jest e React Testing Library *(a serem implementados)*
* **Controle de Versão:** Git e GitHub

---

## 3. Próximos Passos e Definições Abertas

### 3.1. Definições de Campos

* **Categorias Iniciais (`category`):**

  * **Entradas:** Salário, Renda Extra, Investimentos, Outros
  * **Despesas:** Alimentação, Transporte, Moradia, Lazer, Saúde, Educação, Outros

* **Tipos de Conta (`type` em `accounts`):**

  * `checking`: Conta Corrente
  * `savings`: Conta Poupança / Investimentos
  * `credit_card`: Cartão de Crédito

---

### 3.2. Checklist de Configuração Inicial

* [x] Definir e fechar o escopo do MVP
* [x] Escolher o nome do projeto: **Nexus**
* [x] Criar o repositório no GitHub
* [x] Iniciar o projeto localmente com `npx create-next-app@latest`
* [x] Fazer o commit inicial do projeto e deste arquivo de documentação
* [x] Configurar o projeto no console do Firebase
* [x] Instalar dependências (`firebase`, `firebase-admin`)
* [x] Configurar variáveis de ambiente (`.env.local`)
* [x] Criar módulos de conexão com Firebase (`client.ts`, `admin.ts`)

---
