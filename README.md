# Online Judge Platform

An online judge backend platform (similar to LeetCode or HackerRank) engineered to automate the ingestion, execution, and evaluation of algorithmic coding challenges.

---

## 🚀 Overview

This system allows administrators and professors to design coding problems with specific execution limits, while enabling students to submit solutions across multiple programming languages. Submissions are processed asynchronously and evaluated inside isolated sandbox environments to calculate immediate grading and update course leaderboards.

---

## 🛠️ Tech Stack & Architecture

* **Core Framework:** Node.js / NestJS (JavaScript / TypeScript).
* **Architecture:** Clean Architecture Pattern (*Domain/Entities ➔ Use Cases ➔ Interface Adapters ➔ Infrastructure/Drivers*).
* **Database & ORM:** PostgreSQL managed via **Prisma**.
* **Asynchronous Processing:** Redis-backed job queues (Bull MQ) for scalable message distribution.
* **Containerization & Sandbox:** Docker & Docker Compose for multi-language isolated test runner orchestration.

---

## 💎 Key Features

* **Authentication & Authorization:** Role-based access control (RBAC) via JWT (`ADMIN`, `PROFESSOR`, `STUDENT`).
* **Challenge Management:** Complete CRUD operations for programming problems, including test case pairing (`.in` / `.out`), memory constraints, and execution timeouts.
* **Isolated Code Execution:** Stateless, disposable Docker runners built for **4 target programming languages**: Python, Node.js, C++, and Java.
* **Sandboxed Environment Security:** 
* **Automated Evaluation System:** Instant comparison workflows that map process outputs to expected answers, returning granular execution states (`ACCEPTED`, `WRONG_ANSWER`, `TIME_LIMIT_EXCEEDED`, `RUNTIME_ERROR`, `COMPILATION_ERROR`).
* **Course System & Evaluations:** Scope-bound challenge structures that support formal, time-delimited automated exams.
* **Real-time Leaderboards:** Dynamically calculated performance metrics filtered by problem, academic course, or active evaluation windows.
* **Observability:** Structured JSON logs correlated by a unique `submissionId` alongside basic operational health metrics.
* **AI Creative Assistant:** Integrated LLM-powered helper module that assists professors in brainstorming problem ideas, generating descriptions, and creating baseline input/output test case structures based on core topics.

---
## Gemini Prompt

Eres un asistente de IA diseñado que hace solo estas dos cosas
ACCION 1:
genera ideas de Retos de Programacion (tipo maratón)
INPUT: categoría (ejemplo: “Árboles binarios”
▪ “Búsqueda binaria”
▪ “Algoritmos de ordenamiento”)
OUTPUT: una idea de reto en formato JSON de este estilo
{
"title": "Two Sum",
"description": "Dado un arreglo de enteros y un target...",
"difficulty": "EASY",
"tags": [
"arrays",
"hashmap"
],
"timeLimit": 1500,
"memoryLimit": 256
}
ACCION 2: Generar Casos de Uso para un Challenge
INPUT: un challenge en formato JSON
OUTPUT: casos de prueba
{
"input": "15\n27",
"output": "42",
"isHidden": false
}

## Run Backend

```
cd judge-backend
npm install
npx prisma generate
docker-compose up -d --build
docker-compose exec api npx prisma migrate deploy
```

## Run Frontend

```
cd judge-frontend
npm i
npm run dev
```
