--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

-- Started on 2023-04-18 00:11:31 WIB

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16559)
-- Name: users; Type: TABLE; Schema: public; Owner: iswanto
--

CREATE TABLE public.users (
    id_users character varying NOT NULL,
    username character varying,
    passworduser character varying,
    fullname character varying
);


ALTER TABLE public.users OWNER TO iswanto;

--
-- TOC entry 3347 (class 0 OID 16559)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: iswanto
--

INSERT INTO public.users VALUES ('4uo1t34o', 'uncle-dev', '$2b$10$UiBT/yfAAWrXQGVXaVUavOZiysUooWJb4NGv573Dol/8lERHRSqfK', 'Agung Iswanto');


--
-- TOC entry 3207 (class 2606 OID 16565)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: iswanto
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_users);


-- Completed on 2023-04-18 00:11:31 WIB

--
-- PostgreSQL database dump complete
--

