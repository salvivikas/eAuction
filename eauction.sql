--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.2
-- Dumped by pg_dump version 9.5.2

-- Started on 2017-03-05 18:17:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2181 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 181 (class 1259 OID 16592)
-- Name: auctioncatalog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auctioncatalog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auctioncatalog_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 182 (class 1259 OID 16594)
-- Name: auctioncatalog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE auctioncatalog (
    id integer DEFAULT nextval('auctioncatalog_id_seq'::regclass) NOT NULL,
    auctionsessionid integer,
    itemcode text,
    baseprice numeric(18,2),
    reserveprice numeric(18,2),
    quantity integer,
    itemdetails json,
    starttime timestamp with time zone,
    endtime timestamp with time zone,
    status integer
);


ALTER TABLE auctioncatalog OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16601)
-- Name: auctionsession_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auctionsession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auctionsession_id_seq OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 16603)
-- Name: auctionsession; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE auctionsession (
    id integer DEFAULT nextval('auctionsession_id_seq'::regclass) NOT NULL,
    productid integer,
    starttime timestamp with time zone,
    endtime timestamp with time zone,
    status integer
);


ALTER TABLE auctionsession OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16607)
-- Name: catalogdocuments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE catalogdocuments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE catalogdocuments_id_seq OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16609)
-- Name: catalogdocuments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE catalogdocuments (
    id integer DEFAULT nextval('catalogdocuments_id_seq'::regclass) NOT NULL,
    auctioncatalogid integer,
    documentname text,
    path text,
    contenttype integer
);


ALTER TABLE catalogdocuments OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16616)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE category_id_seq
    START WITH 16
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE category_id_seq OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 16618)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    id integer DEFAULT nextval('category_id_seq'::regclass) NOT NULL,
    categorycode text NOT NULL,
    categoryname text NOT NULL,
    isactive boolean
);


ALTER TABLE category OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16625)
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE product_id_seq
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE product_id_seq OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 16627)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE product (
    id integer DEFAULT nextval('product_id_seq'::regclass) NOT NULL,
    categoryid integer NOT NULL,
    productcode text NOT NULL,
    productname text NOT NULL,
    isactive boolean
);


ALTER TABLE product OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 16634)
-- Name: productdefinition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE productdefinition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE productdefinition_id_seq OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 16636)
-- Name: productdefinition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE productdefinition (
    id integer DEFAULT nextval('productdefinition_id_seq'::regclass) NOT NULL,
    productid integer,
    header text,
    description text,
    datatype text,
    ismandatory boolean
);


ALTER TABLE productdefinition OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 16643)
-- Name: userproductmapping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE userproductmapping_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userproductmapping_id_seq OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 16645)
-- Name: userproductmapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE userproductmapping (
    id integer DEFAULT nextval('userproductmapping_id_seq'::regclass) NOT NULL,
    userid integer,
    productid integer
);


ALTER TABLE userproductmapping OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 16649)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16651)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
    username text,
    displayname text,
    email text,
    password text,
    salt text,
    role integer,
    otherdetails json,
    status integer,
    createdon timestamp with time zone,
    modifiedon timestamp with time zone
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 2038 (class 2606 OID 16659)
-- Name: pk_auctioncatalog; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auctioncatalog
    ADD CONSTRAINT pk_auctioncatalog PRIMARY KEY (id);


--
-- TOC entry 2040 (class 2606 OID 16661)
-- Name: pk_auctionsession; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auctionsession
    ADD CONSTRAINT pk_auctionsession PRIMARY KEY (id);


--
-- TOC entry 2042 (class 2606 OID 16663)
-- Name: pk_catalogdocuments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY catalogdocuments
    ADD CONSTRAINT pk_catalogdocuments PRIMARY KEY (id);


--
-- TOC entry 2044 (class 2606 OID 16665)
-- Name: pk_category; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT pk_category PRIMARY KEY (id);


--
-- TOC entry 2046 (class 2606 OID 16667)
-- Name: pk_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product
    ADD CONSTRAINT pk_product PRIMARY KEY (id);


--
-- TOC entry 2048 (class 2606 OID 16669)
-- Name: pk_productdefinition; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY productdefinition
    ADD CONSTRAINT pk_productdefinition PRIMARY KEY (id);


--
-- TOC entry 2050 (class 2606 OID 16671)
-- Name: pk_userproductmapping; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY userproductmapping
    ADD CONSTRAINT pk_userproductmapping PRIMARY KEY (id);


--
-- TOC entry 2052 (class 2606 OID 16673)
-- Name: pk_users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- TOC entry 2053 (class 2606 OID 16674)
-- Name: fk_auctioncatalog_auctionsessionid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auctioncatalog
    ADD CONSTRAINT fk_auctioncatalog_auctionsessionid FOREIGN KEY (auctionsessionid) REFERENCES auctionsession(id);


--
-- TOC entry 2054 (class 2606 OID 16679)
-- Name: fk_auctionsession_productid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auctionsession
    ADD CONSTRAINT fk_auctionsession_productid FOREIGN KEY (productid) REFERENCES product(id);


--
-- TOC entry 2055 (class 2606 OID 16684)
-- Name: fk_catalogdocuments_auctioncatalogid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY catalogdocuments
    ADD CONSTRAINT fk_catalogdocuments_auctioncatalogid FOREIGN KEY (auctioncatalogid) REFERENCES auctioncatalog(id);


--
-- TOC entry 2056 (class 2606 OID 16689)
-- Name: fk_categoryid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product
    ADD CONSTRAINT fk_categoryid FOREIGN KEY (categoryid) REFERENCES category(id);


--
-- TOC entry 2057 (class 2606 OID 16694)
-- Name: fk_productdefinition_productid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY productdefinition
    ADD CONSTRAINT fk_productdefinition_productid FOREIGN KEY (productid) REFERENCES product(id);


--
-- TOC entry 2058 (class 2606 OID 16699)
-- Name: fk_userproductmapping_productid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY userproductmapping
    ADD CONSTRAINT fk_userproductmapping_productid FOREIGN KEY (productid) REFERENCES product(id);


--
-- TOC entry 2059 (class 2606 OID 16704)
-- Name: fk_userproductmapping_userid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY userproductmapping
    ADD CONSTRAINT fk_userproductmapping_userid FOREIGN KEY (userid) REFERENCES users(id);


--
-- TOC entry 2180 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-03-05 18:17:29

--
-- PostgreSQL database dump complete
--

