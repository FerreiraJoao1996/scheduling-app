# 🗓️ Scheduling App  

> Plataforma completa de agendamento, gestão de atendimentos e automação para clínicas, estúdios e profissionais autônomos.

---

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![AWS SQS](https://img.shields.io/badge/AWS%20SQS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![AWS SNS](https://img.shields.io/badge/AWS%20SNS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)

---

## 💡 Visão Geral  

O **Scheduling App** é uma aplicação moderna desenvolvida para centralizar e automatizar o processo de agendamento e gestão de serviços em clínicas, estúdios e consultórios.  

Seu objetivo é **reduzir faltas, otimizar o tempo de profissionais e melhorar a experiência do cliente**, oferecendo uma solução 24/7 integrada com pagamentos, notificações e dashboards em tempo real.

Ideal para negócios como:
- Clínicas de estética, fisioterapia e pilates  
- Barbearias, salões de beleza e spas  
- Estúdios de tatuagem e academias  
- Profissionais autônomos com agenda própria  

---

## ✨ Funcionalidades  

### 🧩 CRUD  
- **Organizações:** personalização com nome e logotipo da clínica ou estúdio.  
- **Permissões:** controle de acesso (admin, profissional e recepção).  
- **Usuários, Clientes, Produtos e Serviços.**  
- **Agendamentos e Atendimentos:** fluxo completo do ciclo de serviço.  
- **Agenda inteligente:** bloqueio de horários por aparelho, sala ou tipo de material.  

---

### 📅 Agendamento  
- Agendamento online **24/7** via site, aplicativo ou redes sociais.  
- Visualização da agenda por **dia, semana e mês**.  
- **Filtros avançados**: por profissional, serviço, unidade ou tipo de cliente.  
- Reagendamento simples, histórico e **lista de espera inteligente**.  
- **Agendamentos recorrentes** (pacotes e sessões repetidas).  

---

### ⏳ Fila de Espera  
- Cadastro automático de clientes na fila com nome, e-mail, telefone e serviço desejado.  
- **Preenchimento automático** quando uma vaga é liberada.  

---

### 📊 Dashboards e Relatórios  
- KPIs em tempo real: **ocupação, vendas, cancelamentos, faturamento.**  
- Relatórios por **profissional, serviço e canal de agendamento**.  
- Métricas de **retenção e taxa de comparecimento**.  
- Visão consolidada por unidade e período.  

---

### 🩺 Prontuário Digital  
- Ficha de anamnese personalizada por serviço.  
- Registro de **fotos antes/depois** com comparação.  
- Observações e evolução por sessão.  
- Registro de **cuidados, contraindicações e notas internas.**  

---

### 🔔 Lembretes e Comunicação  
- Lembretes automáticos via **WhatsApp, SMS e e-mail.**  
- Confirmação de presença com botão “Confirmar” direto no WhatsApp.  
- Chat integrado com o cliente (pós-venda, orientações e suporte).  
- Mensagens programadas para **promoções, retornos e datas especiais.**  

---

### 💳 Pagamentos  
- Pagamentos online via **PIX, cartão, link de pagamento ou carteiras digitais.**  
- Opção de **pagamento antecipado** ou com **sinal**.  
- Emissão de **recibos e notas fiscais.**  
- Controle de **fluxo de caixa** e extrato por cliente.  
- Integração com **PagSeguro, MercadoPago e Stripe.**  

---

### 🎟️ Pacotes e Sessões  
- Venda de pacotes com **créditos por serviço ou tempo.**  
- Alertas automáticos quando créditos estiverem acabando.  
- Validade configurável (30, 60, 90 dias).  
- Check-in automático por **QR Code ou totem.**  

---

### 👥 Clientes  
- Portal do cliente com histórico de **agendamentos, pagamentos e avaliações.**  
- Check-in digital via QR Code (reduz filas e esperas).  
- Avaliação de serviços e profissionais.  

---

### 🧠 Observabilidade e Performance  
- Monitoramento e métricas com **Prometheus + Grafana.**  
- Testes de carga e stress com **k6.**  

---

## 🧱 Stack Técnica  

| Tecnologia | Função |
|-------------|--------|
| **Node.js + Express** | Backend e API REST |
| **TypeScript** | Tipagem estática e manutenção segura |
| **MySQL** | Banco de dados relacional |
| **Docker + Docker Compose** | Ambientes isolados e fácil deploy |
| **Redis** | Cache e filas |
| **AWS SQS / SNS** | Mensageria e eventos assíncronos |
| **JWT** | Autenticação e segurança |
| **Multer** | Upload de arquivos (imagens de prontuário, logotipos, etc.) |
| **Prometheus + Grafana** | Observabilidade e métricas de performance |
| **k6** | Testes de carga e stress |

---

## 🚀 Como Rodar Localmente  

```bash
# 1. Clonar o projeto
git clone https://github.com/FerreiraJoao1996/scheduling-app.git
cd scheduling-app

# 2. Criar o arquivo .env a partir do exemplo
cp .env.mysql.example .env

# 3. Subir os contêineres com Docker Compose
docker-compose up --build

# 4. A aplicação estará disponível em:
http://localhost:3333
