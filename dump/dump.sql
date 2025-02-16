--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Application" (
    "applicationId" integer NOT NULL,
    num text NOT NULL,
    n_raion text NOT NULL,
    fio text NOT NULL,
    years text NOT NULL,
    info text NOT NULL,
    kontrakt text NOT NULL,
    nagrads text NOT NULL,
    geom text NOT NULL,
    status boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Application" OWNER TO postgres;

--
-- Name: Application_applicationId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Application_applicationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Application_applicationId_seq" OWNER TO postgres;

--
-- Name: Application_applicationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Application_applicationId_seq" OWNED BY public."Application"."applicationId";


--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    "roleId" integer NOT NULL,
    "roleName" text NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: Role_roleId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_roleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_roleId_seq" OWNER TO postgres;

--
-- Name: Role_roleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_roleId_seq" OWNED BY public."Role"."roleId";


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "userId" integer NOT NULL,
    "fullName" text NOT NULL,
    "phoneNumber" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "roleId" integer DEFAULT 2 NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_userId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_userId_seq" OWNER TO postgres;

--
-- Name: User_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_userId_seq" OWNED BY public."User"."userId";


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Application applicationId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Application" ALTER COLUMN "applicationId" SET DEFAULT nextval('public."Application_applicationId_seq"'::regclass);


--
-- Name: Role roleId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN "roleId" SET DEFAULT nextval('public."Role_roleId_seq"'::regclass);


--
-- Name: User userId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN "userId" SET DEFAULT nextval('public."User_userId_seq"'::regclass);


--
-- Data for Name: Application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Application" ("applicationId", num, n_raion, fio, years, info, kontrakt, nagrads, geom, status) FROM stdin;
1	8	Тюльганский район	test	14.10.1961 – 02.01.1982	qwertyuiop	Боевые действия в Афганистане	Награжден Орденом Красной Звезды (посмертно)	POINT (6266521.594576891 6868838.029030548)	f
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" ("roleId", "roleName") FROM stdin;
1	admin
2	authUser
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("userId", "fullName", "phoneNumber", email, password, "roleId") FROM stdin;
1	Админов Админ Админович	+79510341677	admin@yandex.ru	$2b$10$JNij6hXP6YLRr5FMs0AaBuPppVeY3ACUwyGQs6l5O7I/o7Knu2A4C	1
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8a27a701-0825-4b6b-b438-6e887f8e4bec	fe9e88d8986f9eb250b20a1addebc9d70b51430bf4d777096425b903c99a904e	2025-02-14 22:37:01.280188+05	20250214173701_add_users	\N	\N	2025-02-14 22:37:01.251641+05	1
96d9d876-0fc7-42a6-9b8f-3e98e41e0717	921abd9fb2e505f73352434032828746a81e3399bbd478589fbb30a4c383575f	2025-02-16 13:07:48.15724+05	20250216080747_add_application	\N	\N	2025-02-16 13:07:47.955567+05	1
\.


--
-- Name: Application_applicationId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Application_applicationId_seq"', 1, true);


--
-- Name: Role_roleId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_roleId_seq"', 2, true);


--
-- Name: User_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_userId_seq"', 1, true);


--
-- Name: Application Application_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId");


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_fullName_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_fullName_key" ON public."User" USING btree ("fullName");


--
-- Name: User_phoneNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_phoneNumber_key" ON public."User" USING btree ("phoneNumber");


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"("roleId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

